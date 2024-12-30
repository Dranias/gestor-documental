import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ModalAgenda = ({ open, handleClose }) => {
    const [personName, setPersonName] = useState('');
    const [personPosition, setpersonPosition] = useState('');
    const [institutionPhone, setInstitutionPhone] = useState('');
    const [institutionAddress, setInstitutionAddress] = useState('');
    const [institutionEmail, setInstitutionEmail] = useState('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
    const [openDialogs, setOpenDialog] = React.useState(false);
    const [dialogMessage, setdialogMessage] = useState('');
    const [dialogTitle, setdialogTitle] = useState('');
    const [textareaError, setTextareaError] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_AGENDA_POST;

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackbarOpen(false);
    };

    const openDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAdd = () => {

        if (!personName.trim()) {
            setErrorSnackbarOpen(true);
            setTextareaError(true);
            return;
        }

        if (!personPosition.trim()) {
            setErrorSnackbarOpen(true);
            setTextareaError(true);
            return;
        }

        const newData = {
            name: personName,
            position: personPosition,
            phone: institutionPhone,
            adress: institutionAddress,
            email: institutionEmail,
        };

        // Limpiar el estado de error si la validación es exitosa
        setTextareaError(false);

        axios.post(apiUrl, newData)
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                if (response.data.message === 'Dependencia creada exitosamente') {
                    setdialogTitle("Agregado existoso");
                    setdialogMessage("Datos agregados correctamente");
                    openDialog();

                    // Redirigir y cerrar modal después del mensaje de éxito
                    setTimeout(() => {
                        console.log("Se actualiza agenda");
                        handleClose();
                    }, 1000); // Espera un segundo para permitir al usuario ver el diálogo
                }
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);

                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message;
                    if (errorMessage === 'Error' && error.response.status === 400) {
                        setdialogTitle("Error al enviar los datos");
                        setdialogMessage("Error.");
                        openDialog();
                    } else {
                        setErrorSnackbarOpen(true);
                    }
                } else {
                    setErrorSnackbarOpen(true);
                }
            });

        handleClose();
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
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Nombre del titular"
                        variant="outlined"
                        style={{
                            width: "100%",
                            borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                        }}
                        value={personName}
                        onChange={(e) => {
                            setPersonName(e.target.value.toUpperCase());
                            setTextareaError(false); // Limpiar el estado de error al cambiar el contenido
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />
                    {textareaError && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            Este campo no puede estar vacío.
                        </div>
                    )}

                    <TextField
                        id="outlined-basic"
                        label="Cargo"
                        variant="outlined"
                        style={{
                            width: "100%",
                            borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                        }}
                        value={personPosition}
                        onChange={(e) => {
                            setpersonPosition(e.target.value.toUpperCase());
                            setTextareaError(false); // Limpiar el estado de error al cambiar el contenido
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />
                    {textareaError && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            Este campo no puede estar vacío.
                        </div>
                    )}

                    <TextField
                        id="outlined-basic"
                        label="Teléfono"
                        variant="outlined"
                        style={{
                            width: "100%",
                        }}
                        value={institutionPhone}
                        onChange={(e) => {
                            setInstitutionPhone(e.target.value);
                            setTextareaError(false); // Limpiar el estado de error al cambiar el contenido
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Dirección"
                        variant="outlined"
                        style={{
                            width: "100%",
                        }}
                        value={institutionAddress}
                        onChange={(e) => {
                            setInstitutionAddress(e.target.value);
                            setTextareaError(false); // Limpiar el estado de error al cambiar el contenido
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        style={{
                            width: "100%",
                        }}
                        value={institutionEmail}
                        onChange={(e) => {
                            setInstitutionEmail(e.target.value);
                            setTextareaError(false); // Limpiar el estado de error al cambiar el contenido
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        sx={{ marginRight: 1 }}
                    >
                        Agregar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Box>
            </Modal>
            <div className="snackbar">
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
                        Error en el registro.
                    </Alert>
                </Snackbar>

                <Dialog
                    open={openDialogs}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialogMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ModalAgenda;
