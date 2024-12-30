import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { io } from 'socket.io-client'; // Importar socket.io-client

const Alerts = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    // Conexión con WebSocket
    useEffect(() => {
        const socket = io('http://localhost:3000'); // Conectar al servidor WebSocket

        // Escuchar por el evento 'alert' desde el servidor
        socket.on('alert', (data) => {
            setAlertMessage(data.message);
            setAlertOpen(true);
        });

        // Limpiar la conexión cuando el componente se desmonte
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MuiAlert onClose={handleCloseAlert} severity="success">
                {alertMessage}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alerts;
