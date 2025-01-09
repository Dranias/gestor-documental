import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ModalAgendaEdit = ({ open, handleClose, editData }) => {
    const [personName, setPersonName] = useState('');
    const [personPosition, setPersonPosition] = useState('');
    const [institutionPhone, setInstitutionPhone] = useState('');
    const [institutionAddress, setInstitutionAddress] = useState('');
    const [institutioEmail, setInstitutioEmail] = useState('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // Set initial values when the modal is opened
    useEffect(() => {
        if (editData) {
            setPersonName(editData.name || '');
            setPersonPosition(editData.position || '');
            setInstitutionPhone(editData.phone || '');
            setInstitutionAddress(editData.address || '');
            setInstitutioEmail(editData.email || '');
        }
    }, [editData]);

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackbarOpen(false);
    };

    const handleUpdate = async () => {
        const apiUrl = `${import.meta.env.VITE_REACT_APP_GESTOR_APP_AGENDA_UPDATE}/${editData.id}`;
        const updatedData = {
            name: personName,
            position: personPosition,
            phone: institutionPhone,
            address: institutionAddress,
            email: institutioEmail,
        };

        try {
            const response = await axios.put(apiUrl, updatedData);

            if (response.status === 200) {
                console.log('Datos actualizados correctamente:', response.data);
                handleClose(); // Cierra el modal tras la actualización
            } else {
                console.error('Error en la actualización:', response);
                setErrorSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            setErrorSnackbarOpen(true);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 700,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <TextField
                        label="Nombre del titular"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Cargo"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={personPosition}
                        onChange={(e) => setPersonPosition(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Dirección"
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        value={institutionAddress}
                        onChange={(e) => setInstitutionAddress(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Teléfono"
                        variant="outlined"
                        fullWidth
                        value={institutionPhone}
                        onChange={(e) => setInstitutionPhone(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={institutioEmail}
                        onChange={(e) => setInstitutioEmail(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        sx={{ marginRight: 1 }}
                    >
                        Actualizar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Box>
            </Modal>

            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleErrorSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                    Error al actualizar los datos.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ModalAgendaEdit;
