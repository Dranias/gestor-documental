import "./Issue.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import trash from '../../assets/trash.png';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customTheme } from '../Datadisplay/Datadisplayoptions';
import ModalIssue from '../Issue/ModalIssue';

const Issue = ({ deleteRow, editRow }) => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const outerTheme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_ISSUE;
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
                            <th className="expand">Temas</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((row, idx) => (
                            <tr key={idx}>
                                <td className="expand">{row.issue}</td>
                                <td className="fit">
                                    <span className="actions">
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
                <ModalIssue open={modalOpen} handleClose={handleCloseModal} addInstitution={addInstitution} />
            </ThemeProvider>
        </div>
    );
};

export default Issue;
