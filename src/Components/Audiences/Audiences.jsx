import "./Audiences.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import trash from "../../assets/trash.png";
import edit from "../../assets/edit.png";
import print from "../../assets/imprimir.png"
import Box from "@mui/material/Box";
import { Grid, ThemeProvider, useTheme } from "@mui/material";
import { customTheme } from "../CustomTheme/CustomTheme";
import ModalAudiences from "./ModalAudiences";
import DownloadFileAudiences from '../DownloadFile/DownloadFileAudiences';

const Audiences = () => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const outerTheme = useTheme();

    // Función para obtener todas las audiencias desde el servidor
    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_AUDIENCES;
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching audiences:", error);
        }
    };

    // Función para eliminar una audiencia por su ID
    const deleteAudienceById = async (id) => {
        try {
            const apiUrl = `${import.meta.env.VITE_REACT_APP_GESTOR_APP_AUDIENCES_DELETE}/${id}`;
            await axios.delete(apiUrl);
            setData((prev) => prev.filter((item) => item.id !== id)); // Elimina la audiencia de la lista
            handleCloseModal();
        } catch (error) {
            console.error("Error deleting audience:", error);
        }
    };

    // Confirmación de eliminación de audiencia
    const confirmDelete = () => {
        if (selectedId) {
            deleteAudienceById(selectedId);
        }
    };

    // Función para abrir el modal para agregar o editar audiencias
    const handleOpenModal = (row = null) => {
        setEditData(row);
        setOpenModal(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setEditData(null);
    };

    // Guardar los datos de la audiencia (agregar o editar)
    const handleSaveAudience = async (audienceData) => {
        try {
            const formattedData = {
                ...audienceData,
                date: audienceData.date,
            };
    
            if (editData) {
                const apiUrl = `${import.meta.env.VITE_REACT_APP_GESTOR_APP_AUDIENCES_PATCH}/${editData.id}`;
                console.log(apiUrl);
                await axios.patch(apiUrl, formattedData);
            } else {
                const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_AUDIENCES_POST;
                await axios.post(apiUrl, formattedData);
            }
    
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving audience:", error);
        }
    };

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchData();
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

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
                                    fontSize: "15px",
                                    color: "white",
                                }}
                                onClick={() => handleOpenModal()} // Abre el modal para agregar nueva audiencia
                            >
                                Agregar
                            </button>
                        </Box>
                    </Grid>
                </Box>
                <br />
                <table className="tablaAudiences">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th className="nombre">Nombre</th>
                            <th className="cargo">Cargo</th>
                            <th className="descripcion">Descripción</th>
                            <th className="fecha">Fecha</th>
                            <th>Prioritaria</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.folio}</td>
                                    <td className="nombre">{row.name}</td>
                                    <td className="cargo">{row.position}</td>
                                    <td className="descripcion">{row.description}</td>
                                    <td>{row.date}</td>
                                    <td>{row.priority ? "Sí" : "No"}</td>
                                    <td className="fit">
                                        <span className="actions">
                                            <DownloadFileAudiences data={row} />
                                            <button
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    backgroundColor: "transparent",
                                                    border: "none",
                                                }}
                                                onClick={() => handleOpenModal(row)} // Abre el modal para editar la audiencia
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
                                                onClick={() => confirmDelete(row.id)} // Confirma la eliminación
                                            >
                                                <img src={trash} alt="Delete" style={{ height: "70%" }} />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Sin datos...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ThemeProvider>

            {/* Modal para crear o editar audiencias */}
            <ModalAudiences
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleSaveAudience}
                initialData={editData}
            />
        </div>
    );
};

export default Audiences;
