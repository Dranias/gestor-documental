import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { io } from 'socket.io-client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const socket = io('http://localhost:3000', {
  transports: ['websocket'], // Ajusta el puerto según tu servidor
});

const ModalAgenda = ({ open, handleClose }) => {
  const [personName, setPersonName] = useState('');
  const [personPosition, setpersonPosition] = useState('');
  const [institutionPhone, setInstitutionPhone] = useState('');
  const [institutionAddress, setInstitutionAddress] = useState('');
  const [institutionEmail, setInstitutionEmail] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false);
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

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackbarOpen(false);
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
      address: institutionAddress,
      email: institutionEmail,
    };

    console.log(newData);

    setTextareaError(false);

    axios
      .post(apiUrl, newData)
      .then((response) => {
        if (response.data.message === 'Dependencia creada exitosamente') {
          setdialogTitle('Agregado exitoso');
          setdialogMessage('Datos agregados correctamente');
          openDialog();

          setTimeout(() => {
            handleClose();
          }, 1000);
        }
      })
      .catch(() => {
        setErrorSnackbarOpen(true);
      });

    handleClose();
  };

  useEffect(() => {
    // Escucha eventos del WebSocket
    socket.on('databaseUpdated', (data) => {
      console.log('Evento recibido desde el servidor:', data);
      setSuccessSnackbarOpen(true);
    });

    // Limpia los eventos al desmontar el componente
    return () => {
      socket.off('databaseUpdated');
    };
  }, []);

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
            label="Nombre del titular"
            variant="outlined"
            style={{
              width: '100%',
              borderColor: textareaError ? 'red' : '#ccc',
            }}
            value={personName}
            onChange={(e) => {
              setPersonName(e.target.value.toUpperCase());
              setTextareaError(false);
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Cargo"
            variant="outlined"
            style={{
              width: '100%',
              borderColor: textareaError ? 'red' : '#ccc',
            }}
            value={personPosition}
            onChange={(e) => {
              setpersonPosition(e.target.value.toUpperCase());
              setTextareaError(false);
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            style={{ width: '100%' }}
            value={institutionAddress}
            onChange={(e) => setInstitutionAddress(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            style={{ width: '100%' }}
            value={institutionPhone}
            onChange={(e) => setInstitutionPhone(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            style={{ width: '100%' }}
            value={institutionEmail}
            onChange={(e) => setInstitutionEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAdd} sx={{ marginRight: 1 }}>
            Agregar
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
          Error en el registro.
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleSuccessSnackbarClose} severity="success">
          ¡Base de datos actualizada!
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialogs}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalAgenda;
