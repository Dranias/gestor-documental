import React, { useState, useEffect } from "react";
import axios from "axios";
import trash from "../../assets/trash.png";
import Box from "@mui/material/Box";
import ModalIssue from "../Issue/ModalIssue";

import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from '../CustomTheme/CustomTheme';

const Issue = ({ deleteRow, editRow }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null); // Para la confirmación de eliminación
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Control del diálogo de confirmación
    const outerTheme = useTheme();

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

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedRow) return;

        try {
            const apiUrl = `${import.meta.env.VITE_REACT_APP_GESTOR_APP_ISSUE_DELETE}/${selectedRow.id}`;
            await axios.delete(apiUrl);

            // Actualizar los datos después de eliminar
            setData((prevData) => prevData.filter((item) => item.id !== selectedRow.id));

            console.log(`Issue con ID ${selectedRow.id} eliminado correctamente`);
        } catch (error) {
            console.error("Error eliminando el tema:", error);
        }

        setSelectedRow(null);
        setDeleteDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setSelectedRow(null);
        setDeleteDialogOpen(false);
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
                                                onClick={() => handleDeleteClick(row)}
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
            </ThemeProvider>

            {/* Diálogo de confirmación */}
            <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Confirmación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este tema? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Issue;
