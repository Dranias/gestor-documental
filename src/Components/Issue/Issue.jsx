import "./Issue.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import trash from "../../assets/trash.png";
import Box from "@mui/material/Box";
import ModalIssue from "../Issue/ModalIssue";

import { Grid } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from "../Datadisplay/Datadisplayoptions";
import { io } from "socket.io-client";
import { Snackbar, SnackbarContent } from '@mui/material';

const Issue = ({ deleteRow, editRow }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const outerTheme = useTheme();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        // Conectar con el servidor de Socket.IO
        const socket = io(import.meta.env.VITE_REACT_APP_SOCKET_SERVER_URL);

        // Verificar conexión con un log
        socket.on('connect', () => {
            console.log('Conectado al servidor WebSocket');
        });

        // Escuchar el evento 'issue-added' del servidor
        socket.on('issue-added', (newIssue) => {
            console.log('Nuevo issue recibido:', newIssue); // Verificar si recibes los datos
            setData((prevData) => [newIssue, ...prevData]); // Actualiza el estado con el nuevo issue
            // Establecer el mensaje y abrir el Snackbar
            setSnackbarMessage(`Fue agregado el tema "${newIssue.issue}"`);
            setSnackbarOpen(true);
        });

        // Verificar si ocurre un error
        socket.on('connect_error', (err) => {
            console.error('Error de conexión a WebSocket:', err);
        });

        // Cleanup al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_ISSUE;
                const response = await axios.get(apiUrl);

                const sortedData = Array.isArray(response.data)
                    ? response.data.sort((a, b) => {
                        const nameA = a.name || "";
                        const nameB = b.name || "";
                        return nameA.localeCompare(nameB);
                    })
                    : [response.data];
                setData(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const addInstitution = (name) => {
        const newInstitution = {
            id: data.length + 1,
            institution: name,
            createdAt: new Date().toISOString(),
        };
        setData([newInstitution, ...data]);
    };

    return (
        <div className="table-wrapper">
            <ThemeProvider theme={customTheme(outerTheme)}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container className="grid">
                        <Box
                            component="section"
                            sx={{
                                p: 2,
                                border: 1,
                                bgcolor: "primary.nofocus",
                                "&:hover": {
                                    bgcolor: "primary.dark",
                                },
                            }}
                        >
                            <button
                                className="button"
                                style={{ backgroundColor: "#095240", fontSize: "20px", color: "white" }}
                                onClick={handleOpenModal}
                            >
                                Nuevo
                            </button>
                        </Box>
                    </Grid>
                </Box>
                <div>
                    <br />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="expand">Temas</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="expand">{row.issue}</td>
                                    <td className="fit">
                                        <span className="actions">
                                            <button
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                }}
                                                onClick={() => deleteRow(idx)}
                                            >
                                                <img src={trash} alt="Delete" style={{ height: "70%" }} />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <ModalIssue open={modalOpen} handleClose={handleCloseModal} addInstitution={addInstitution} />
                {/* Snackbar para mostrar mensaje cuando se agregue un nuevo tema */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <SnackbarContent
                        message={snackbarMessage}
                        style={{
                            backgroundColor: '#4caf50', // Green background for success
                            color: '#fff', // White text
                        }}
                    />
                </Snackbar>
            </ThemeProvider>
        </div>
    );
};

export default Issue;
