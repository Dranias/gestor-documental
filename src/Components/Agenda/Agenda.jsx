import "./Agenda.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import trash from "../../assets/trash.png";
import edit from "../../assets/edit.png";
import Box from "@mui/material/Box";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from "../Datadisplay/Datadisplayoptions";
import { useNavigate } from 'react-router-dom';
import ModalAgenda from "../Agenda/ModalAgenda";
import ModalAgendaEdit from "../Agenda/ModaAgendaEdit";

const Agenda = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editData, setEditData] = useState(null);
    const outerTheme = useTheme();
    const navigate = useNavigate();

    // Función para obtener los datos de la agenda
    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_AGENDA;
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Llamar fetchData al montar el componente
    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = () => setModalOpen(true);
    const handleOpenModalEdit = (row) => {
        setEditData(row);
        setModalOpenEdit(true);
    };

    const handleOpenConfirm = (id) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };
    const handleCloseConfirm = () => setConfirmOpen(false);

    const handleCloseModal = () => {
        setModalOpen(false);
        fetchData(); // Actualiza los datos al cerrar el modal
    };

    const handleCloseModalEdit = () => {
        setModalOpenEdit(false);
        fetchData(); // Actualiza los datos al cerrar el modal de edición
    };

    const deleteAgendaById = async (id) => {
        try {
            const apiUrl = `${import.meta.env.VITE_REACT_APP_GESTOR_APP_AGENDA_DELETE}/${id}`;
            await axios.delete(apiUrl);
            setData((prevData) => prevData.filter((item) => item.id !== id));
            handleCloseConfirm();
        } catch (error) {
            console.error("Error deleting institution:", error);
        }
    };

    const confirmDelete = () => {
        if (selectedId) {
            deleteAgendaById(selectedId);
        }
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
                                style={{
                                    backgroundColor: "#095240",
                                    fontSize: "20px",
                                    color: "white",
                                }}
                                onClick={handleOpenModal}
                            >
                                Agregar
                            </button>
                        </Box>
                    </Grid>
                </Box>
                <div>
                    <br />
                    <center>
                        <p>--- Error en agregar. Para visualizar el nuevo elemento oprimir "f5" ---</p>
                    </center>
                    <br />
                </div>
                <table className="tablaAgenda">
                    <thead>
                        <tr>
                            <th style={{ width: "30%" }}>Titular</th>
                            <th style={{ width: "30%" }}>Cargo</th>
                            <th style={{ width: "15%" }}>Dirección</th>
                            <th style={{ width: "15%" }}>Teléfono</th>
                            <th style={{ width: "15%" }}>Email</th>
                            <th style={{ width: "auto" }}>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.position}</td>
                                    <td>{row.address}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.email}</td>
                                    <td className="fit">
                                        <span className="actions">
                                            <button
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                }}
                                                onClick={() => handleOpenModalEdit(row)}
                                            >
                                                <img src={edit} alt="Edit" style={{ height: "70%" }} />
                                            </button>
                                            <button
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                }}
                                                onClick={() => handleOpenConfirm(row.id)}
                                            >
                                                <img src={trash} alt="Delete" style={{ height: "70%" }} />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Sin datos...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <ModalAgenda open={modalOpen} handleClose={handleCloseModal} onDataChange={fetchData} />
                <ModalAgendaEdit
                    open={modalOpenEdit}
                    handleClose={handleCloseModalEdit}
                    editData={editData}
                    onDataChange={fetchData}
                />
                <Dialog
                    open={confirmOpen}
                    onClose={handleCloseConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"¿Está seguro de eliminar?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta acción no se puede deshacer.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm} style={{ backgroundColor: "#AFA5A2" }}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            style={{ backgroundColor: "#691C32" }}
                            autoFocus
                        >
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default Agenda;
