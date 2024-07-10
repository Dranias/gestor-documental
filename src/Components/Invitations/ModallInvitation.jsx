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
    const [invitationName, setinvitationName] = useState('');
    const [invitationPosition, setinvitationPosition] = useState('');
    const [invitationAvenue, setinvitationAvenue] = useState('');
    const [invitationMunicipality, setinvitationMunicipality] = useState('');
    const [invitationDay, setinvitationDay] = useState('');
    const [invitationEventDate, setinvitationEventDate] = useState('');
    const [invitationEventHour, setinvitationEventHour] = useState('');
    const [invitationEvent, setinvitationEvent] = useState('');
    const [invitationMatters, setinvitationMatters] = useState('');
    const [invitationPriority, setinvitationPriority] = useState('');

    const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
    const [openDialogs, setOpenDialog] = React.useState(false);
    const [dialogMessage, setdialogMessage] = useState('');
    const [dialogTitle, setdialogTitle] = useState('');
    const [textareaError, setTextareaError] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_INVITATIONS_POST;

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

        if (!invitationAvenue.trim() || !invitationMunicipality.trim() || !invitationEvent.trim()) {
            setErrorSnackbarOpen(true);
            setTextareaError(true);
            return;
        }

        const newData = {
            name: invitationName,
            position: invitationPosition,
            avenue: invitationAvenue,
            municipality: invitationMunicipality,
            day: invitationDay,
            enventDate: invitationEventDate,
            enventHour: invitationEventHour,
            event: invitationEvent,
            matters: invitationMatters,
            priority: invitationPriority
        };

        // Limpiar el estado de error si la validación es exitosa
        setTextareaError(false);

        axios.post(apiUrl, newData)
            .then(response => {
                console.log(newData)
                console.log('Respuesta del servidor:', response.data);
                if (response.data.message === 'Invitación creada exitosamente') {
                    setdialogTitle("Agregado existoso");
                    setdialogMessage("Datos agregados correctamente");
                    openDialog();
                }
                navigate(`/invitations`);
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
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="modal-title">Nueva Invitación</h2>
                    <br />

                    <TextField
                        id="outlined-multiline-static"
                        label="Invita"
                        style={{
                            width: "100%",
                        }}
                        value={invitationName}
                        onChange={(e) => {
                            setinvitationName(e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Cargo"
                        multiline
                        rows={2}
                        style={{
                            width: "100%",
                        }}
                        value={invitationPosition}
                        onChange={(e) => {
                            setinvitationPosition(e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Lugar del Evento"
                        multiline
                        rows={2}
                        style={{
                            width: "100%",
                            borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                        }}
                        value={invitationAvenue}
                        onChange={(e) => {
                            setinvitationAvenue(e.target.value);
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
                        id="outlined-multiline-static"
                        label="Ciudad/Municipio"
                        style={{
                            width: "100%",
                        }}
                        value={invitationMunicipality}
                        onChange={(e) => {
                            setinvitationMunicipality(e.target.value);
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
                        id="outlined-multiline-static"
                        label="Día"
                        style={{
                            width: "100%",
                        }}
                        value={invitationDay}
                        onChange={(e) => {
                            setinvitationDay(e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Fecha"
                        style={{
                            width: "100%",
                        }}
                        value={invitationEventDate}
                        onChange={(e) => {
                            setinvitationEventDate(e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Hora"
                        style={{
                            width: "100%",
                        }}
                        value={invitationEventHour}
                        onChange={(e) => {
                            setinvitationEventHour(e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Evento"
                        multiline
                        rows={2}
                        style={{
                            width: "100%",
                            borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                        }}
                        value={invitationEvent}
                        onChange={(e) => {
                            setinvitationEvent(e.target.value);
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
                        id="outlined-multiline-static"
                        label="Asuntos a Considerar"
                        multiline
                        rows={2}
                        style={{
                            width: "100%",
                            borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                        }}
                        value={invitationMatters}
                        onChange={(e) => {
                            setinvitationMatters(e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                        spellCheck="true"
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Prioritaria"
                        style={{
                            width: "100%",
                        }}
                        value={invitationPriority}
                        onChange={(e) => {
                            setinvitationPriority(e.target.value);
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

export default ModalInstitution;
