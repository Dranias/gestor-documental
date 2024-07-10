import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Grid } from "@mui/material";
import ModalInvitation from "../Invitations/ModallInvitation";

const VerticalTable = () => {
    const [responseData, setResponseData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setModalOpen(false);
        window.location.reload(); // Recarga la página al cerrar el modal
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_INVITATIONS;
                const response = await axios.get(apiUrl);
                const reversedData = Array.isArray(response.data) ? response.data.reverse() : [response.data];
                setResponseData(reversedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box style={{ width: "90%" }}>
                <Grid container className="grid">
                    <Box
                        component="section"
                        sx={{
                            p: 2,
                            border: 1,
                            bgcolor: "primary.nofocus",
                            "&:hover": {
                                bgcolor: "#691C32",
                            },
                        }}
                    >
                        <button className="button" style={{ backgroundColor: '#095240', width: '100%', fontSize: '1em', color: 'white' }} onClick={handleOpenModal}>
                            Agregar
                        </button>
                    </Box>
                </Grid>
                <br />
                {responseData.map((item, index) => (
                    <Box key={index} mb={4} p={2} border={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Typography variant="body1"><strong>Invita:</strong></Typography>
                                <Typography variant="body1"><strong>Cargo:</strong></Typography>
                                <Typography variant="body1"><strong>Lugar del Evento:</strong></Typography>
                                <Typography variant="body1"><strong>Ciudad/Municipio:</strong></Typography>
                                <Typography variant="body1"><strong>Día:</strong></Typography>
                                <Typography variant="body1"><strong>Fecha:</strong></Typography>
                                <Typography variant="body1"><strong>Hora:</strong></Typography>
                                <Typography variant="body1"><strong>Evento:</strong></Typography>
                                <Typography variant="body1"><strong>Asunto a considerar:</strong></Typography>
                                <Typography variant="body1"><strong>Prioritaria:</strong></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{item.name}</Typography>
                                <Typography variant="body1">{item.position || "N/A"}</Typography>
                                <Typography variant="body1">{item.avenue}</Typography>
                                <Typography variant="body1">{item.municipality || "N/A"}</Typography>
                                <Typography variant="body1">{item.day || "N/A"}</Typography>
                                <Typography variant="body1">{item.enventDate}</Typography>
                                <Typography variant="body1">{item.enventHour || "N/A"}</Typography>
                                <Typography variant="body1">{item.event}</Typography>
                                <Typography variant="body1">{item.matters || "N/A"}</Typography>
                                <Typography variant="body1">{item.priority || "N/A"}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <ModalInvitation open={modalOpen} handleClose={handleCloseModal} />
            </Box>
        </Box>
    );
};

export default VerticalTable;
