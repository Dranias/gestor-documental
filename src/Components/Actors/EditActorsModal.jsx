import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_ACTORS_UPDATE;

const EditActorsModal = ({ open, onClose }) => {
    const [actorData, setActorData] = useState({
        realiza: '',
        revisa: '',
        autoriza: '',
    });
    const [actorId, setActorId] = useState(null); // Estado para almacenar el actorId

    // Función para cargar los datos al abrir el modal
    useEffect(() => {
        const fetchActorsData = async () => {
            try {
                const response = await axios.get(apiUrl);  // Obtener datos desde el backend
                const data = response.data.data;
                setActorData({
                    realiza: data.realiza || '',
                    revisa: data.revisa || '',
                    autoriza: data.autoriza || '',
                });
                setActorId(data.id); // Asignar el actorId a partir de la respuesta
            } catch (error) {
                console.error('Error al obtener datos de actores:', error);
                alert('Hubo un error al obtener los datos de actores');
            }
        };

        if (open) {
            fetchActorsData();  // Cargar datos cuando el modal se abre
        }
    }, [open]);

    const handleChange = (field) => (event) => {
        setActorData({ ...actorData, [field]: event.target.value });
    };

    const handleUpdate = async () => {
        if (!actorId) {
            console.error('No se ha encontrado un actorId');
            return;
        }

        // Filtrar solo los campos modificados (es decir, aquellos que tienen un valor)
        const updatedData = {};
        if (actorData.realiza) updatedData.realiza = actorData.realiza;
        if (actorData.revisa) updatedData.revisa = actorData.revisa;
        if (actorData.autoriza) updatedData.autoriza = actorData.autoriza;

        try {
            // Incluir el id en la solicitud PATCH
            await axios.patch(`${apiUrl}/${actorId}`, updatedData);
            alert('Datos actualizados correctamente');
            onClose();
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Hubo un error al actualizar');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Editar Colaboradores
                </Typography>
                <TextField
                    fullWidth
                    label="Realiza"
                    value={actorData.realiza}  // Asignar el valor de "realiza"
                    onChange={handleChange('realiza')}  // Actualizar el estado correspondiente
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Revisa"
                    value={actorData.revisa}  // Asignar el valor de "revisa"
                    onChange={handleChange('revisa')}  // Actualizar el estado correspondiente
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Autoriza"
                    value={actorData.autoriza}  // Asignar el valor de "autoriza"
                    onChange={handleChange('autoriza')}  // Actualizar el estado correspondiente
                    margin="normal"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}  // Un solo botón para actualizar todos los campos
                >
                    Modificar
                </Button>
                <Button fullWidth variant="text" onClick={onClose}>
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
};

export default EditActorsModal;
