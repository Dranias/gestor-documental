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

const ModalInstitution = ({ open, handleClose }) => {
    const [institutionName, setInstitutionName] = useState('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
    const [openDialogs, setOpenDialog] = React.useState(false);
    const [dialogMessage, setdialogMessage] = useState('');
    const [dialogTitle, setdialogTitle] = useState('');
    const [textareaError, setTextareaError] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_INSTITUTION_POST;

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

        if (!institutionName.trim()) {
            setErrorSnackbarOpen(true);
            setTextareaError(true);
            return;
        }

        const newData = {
            institution: institutionName,
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
                }
                navigate(`/institutions`);
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);

                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message;
                    if (errorMessage === 'El número de documento ya existe' && error.response.status === 400) {
                        setdialogTitle("Error al enviar los datos");
                        setdialogMessage("Número de OPG ya existe en la base de datos.");
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
                        width: 800,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Nombre de la Institución"
                        variant="outlined"
                        multiline
                        rows={3}
                        style={{
                            width: "100%",
                            borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                        }}
                        value={institutionName}
                        onChange={(e) => {
                            setInstitutionName(e.target.value);
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

export default ModalInstitution;
