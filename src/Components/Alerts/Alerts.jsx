import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { io } from "socket.io-client"; // Importar socket.io-client

const Alerts = () => {
    const [alertMessage, setAlertMessage] = useState(""); // Mensaje de la alerta
    const [alertOpen, setAlertOpen] = useState(false); // Estado de la visibilidad de la alerta
    const [alertSeverity, setAlertSeverity] = useState("info"); // Estado del tipo de alerta

    // Conexión con WebSocket
    useEffect(() => {
        const socket = io(import.meta.env.VITE_REACT_APP_SOCKET_SERVER_URL); // Conectar al servidor WebSocket

        // Escuchar por el evento 'alert' desde el servidor
        socket.on("alert", (data) => {
            setAlertMessage(data.message);
            setAlertSeverity(data.severity || "info");
            setAlertOpen(true);
        });

        // Alertas para la entity Data
        socket.on("data-added", (data) => {
            setAlertMessage(`Nuevo registro añadido: ${data}`);
            setAlertSeverity("info");
            setAlertOpen(true);
        });

        socket.on("data-patch", (data) => {
            setAlertMessage(`Registro modificado: ${data}`);
            setAlertSeverity("info");
            setAlertOpen(true);
        });

        // Alertas para la entity Institution
        socket.on("institution-added", (data) => {
            setAlertMessage(`Añadida la dependencia: ${data}`);
            setAlertSeverity("info");
            setAlertOpen(true);
        });

        socket.on("institution-deleted", (data) => {
            setAlertMessage(`Se eliminó la dependencia: ${data}`);
            setAlertSeverity("error"); // Cambiar el tipo de alerta a error
            setAlertOpen(true);
        });

        // Alertas para la entity Issue
        socket.on("issue-added", (data) => {
            setAlertMessage(`Añadido el tema: ${data}`);
            setAlertSeverity("info");
            setAlertOpen(true);
        });

        socket.on("issue-deleted", (data) => {
            setAlertMessage(`Tema eliminado: ${data}`);
            setAlertSeverity("error"); // Cambiar el tipo de alerta a error
            setAlertOpen(true);
        });

        // Alertas para la entity Agenda
        socket.on("agenda-added", (data) => {
            setAlertMessage(`Añadido nuevo contacto: ${data}`);
            setAlertSeverity("info");
            setAlertOpen(true);
        });

        socket.on("agenda-patch", (data) => {
            setAlertMessage(`Modificaciones en contacto realizadas: ${data}`);
            setAlertSeverity("info");
            setAlertOpen(true);
        });

        socket.on("agenda-delete", (data) => {
            setAlertMessage(`Contacto eliminado: ${data}`);
            setAlertSeverity("error"); // Cambiar el tipo de alerta a error
            setAlertOpen(true);
        });

        //Alertas para la entity Actors
        socket.on("actor-patch", (data) => {
            setAlertMessage(`Modificaciones realizadas en Colaboradores`);
            setAlertSeverity("info");
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
                vertical: "top",
                horizontal: "right",
            }}
        >
            <MuiAlert onClose={handleCloseAlert} severity={alertSeverity}>
                {alertMessage}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alerts;
