import "./Institutions.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import trash from '../../assets/trash.png';
import Box from '@mui/material/Box';
import ModalInstitution from '../Institutions/ModalInstitution';

import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customTheme } from '../CustomTheme/CustomTheme';
import { useSnackbar } from "../SnackbarContext/SnackbarContext";  // Importar el hook

const Institutions = ({ deleteRow, editRow }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const outerTheme = useTheme();

    // Usar el hook de Snackbar
    const { showSnackbar } = useSnackbar();  // Llamar a la función de Snackbar

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_INSTITUTIONS;
                const response = await axios.get(apiUrl);

                const sortedData = Array.isArray(response.data)
                    ? response.data.sort((a, b) => {
                        const nameA = a.name || '';
                        const nameB = b.name || '';
                        return nameA.localeCompare(nameB);
                    })
                    : [response.data];
                setData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleOpenConfirm = (id) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };
    const handleCloseConfirm = () => setConfirmOpen(false);

    const addInstitution = (name) => {
        const newInstitution = {
            id: data.length + 1,
            institution: name,
            createdAt: new Date().toISOString(),
        };
        setData([newInstitution, ...data]);
    };

    const deleteInstitutionById = async (id) => {
        try {
            const apiUrl = `${import.meta.env.VITE_REACT_APP_GESTOR_APP_INSTITUTION_DELETE}/${id}`;
            await axios.delete(apiUrl);
            setData(data.filter((institution) => institution.id !== id));
            handleCloseConfirm();
        } catch (error) {
            console.error('Error deleting institution:', error);
        }
    };

    const confirmDelete = () => {
        if (selectedId) {
            deleteInstitutionById(selectedId);
        }
    };

    return (
        <div className="table-wrapper">
            <ThemeProvider theme={customTheme(outerTheme)}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container className='grid'>
                        <Box component="section"
                            sx={{
                                p: 2, border: 1,
                                bgcolor: 'primary.nofocus',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                        >
                            <button className="button" style={{ backgroundColor: '#095240', fontSize: '20px', color: 'white' }} onClick={handleOpenModal}>
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
                            <th className="expand">Dependencias</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((row) => (
                            <tr key={row.id}>
                                <td className="expand">{row.institution}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <button
                                            style={{ width: '60px', height: '60px', backgroundColor: 'transparent', border: 'none' }}
                                            onClick={() => handleOpenConfirm(row.id)}
                                        >
                                            <img src={trash} alt="Delete" style={{ height: '70%' }} />
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="2">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <ModalInstitution open={modalOpen} handleClose={handleCloseModal} addInstitution={addInstitution} />

                <Dialog
                    open={confirmOpen}
                    onClose={handleCloseConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"¿Está seguro de eliminar?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta acción no se puede deshacer.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm} style={{ backgroundColor: '#AFA5A2' }}>
                            Cancelar
                        </Button>
                        <Button onClick={confirmDelete} style={{ backgroundColor: '#691C32' }} autoFocus>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default Institutions;
