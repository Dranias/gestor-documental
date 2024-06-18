import React, { useState, useEffect } from "react";
import "./Institutions.css";
import axios from 'axios';
import edit from '../../assets/edit.png';
import trash from '../../assets/trash.png';
import Tooltip from '@mui/material/Tooltip';
import search_icon_light from '../../assets/search-w.png';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customTheme } from '../Datadisplay/Datadisplayoptions';
import ModalInstitution from '../Institutions/ModalInstitution';

const Institutions = ({ deleteRow, editRow }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const outerTheme = useTheme();

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

    const addInstitution = (name) => {
        const newInstitution = {
            id: data.length + 1, // Assuming ID is just incremented for simplicity
            institution: name,
            createdAt: new Date().toISOString(),
        };
        setData([newInstitution, ...data]);
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
                        <Grid item xs={2}>
                            <Box component="section"
                                sx={{
                                    p: 2, border: 1,
                                    bgcolor: 'primary.nofocus',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                            >
                                <div className='search-box' style={{ backgroundColor: '#691C32', padding: '10px 20px', borderRadius: '40px', display: 'flex', alignItems: 'center', width: '250px' }}>
                                    <Tooltip title={"Busqueda de Dependencia"} placement="top">
                                        <input
                                            type="text"
                                            placeholder='Buscar'
                                            onChange={(e) => handleSearch(e.target.value)}
                                            style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '18px', maxWidth: '200px' }}
                                        />
                                    </Tooltip>
                                    <img src={search_icon_light} alt="Search Icon" />
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <div>
                    <br />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="expand">Instituciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((row, idx) => (
                            <tr key={idx}>
                                <td className="expand">{row.institution}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <button style={{ width: '60px', height: '60px', backgroundColor: 'transparent', border: 'none' }} onClick={() => editRow(idx)}>
                                            <img src={edit} alt="Edit" style={{ height: '70%' }} />
                                        </button>
                                        <button style={{ width: '60px', height: '60px', backgroundColor: 'transparent', border: 'none' }} onClick={() => deleteRow(idx)}>
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
            </ThemeProvider>
        </div>
    );
};

export default Institutions;
