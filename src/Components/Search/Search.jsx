import './Search.css';
import DownloadFile from '../DownloadFile/DownloadFile';

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useSearch } from '../../SearchContext';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { customTheme } from '../CustomTheme/CustomTheme';

import flechaDer from '../../assets/f-der.png';
import flechaizq from '../../assets/f-izq.png';
import notfound from '../../assets/product-not-found.png';
import editar from '../../assets/editar-archivo.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';

const Search = () => {
    const { searchResults } = useSearch();
    const [data, setData] = useState([]);
    const [lastIndex, setLastIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const outerTheme = useTheme();

    useEffect(() => {
        if (Array.isArray(searchResults) && searchResults.length > 0) {
            setData(searchResults);
            setLastIndex(0);
        } else {
            setData([]);
            setLastIndex(null);
        }
    }, [searchResults]);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
            setOpenSnackbar(true);
        }
    };

    const handleForwardClick = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setOpenSnackbar(true);
        }
    };

    const handleChangePage = (event, value) => {
        setCurrentIndex(value - 1);
    };

    const updateData = () => {
        navigate(`/updateData/${data[currentIndex]?.id}`);
    };

    const currentData = data[currentIndex] || {};

    return (
        <div>
            <ThemeProvider theme={customTheme(outerTheme)}>
                {Array.isArray(data) && data.length > 0 ? (
                    <div className="content-container">
                        <Grid container className='grid'>
                            <Grid item>
                                <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' } }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        label="FOLIO"
                                        variant="outlined"
                                        value={currentData.folio || ''}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' } }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        label="HORA"
                                        variant="outlined"
                                        value={currentData.time || 'N/A'}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' } }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        label="FECHA"
                                        variant="outlined"
                                        value={currentData.date ? new Date(currentData.date).toLocaleDateString() : "Fecha no disponible"}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' } }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        label="TEMA"
                                        variant="outlined"
                                        value={currentData.issue || 'N/A'}
                                    />
                                </Box>
                            </Grid>

                            <div className='texfields-containers' style={{ width: '70%' }}>
                                <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' }, marginBottom: 2 }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        label="NOMBRE"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        value={currentData.name || "Nombre no disponible"}
                                    />
                                </Box>

                                <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' }, marginBottom: 2 }}>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <h1>Turno: </h1><br />
                                    </Grid>
                                    {Array.isArray(currentData.docNumber) ? (
                                        <div style={{ textAlign: 'center' }}>
                                            {currentData.docNumber.map((doc, docIndex) => (
                                                <div key={docIndex}>
                                                    {currentData.institution && currentData.institution[docIndex] && (
                                                        <div>
                                                            <TextField
                                                                InputProps={{ readOnly: true }}
                                                                label="OPE"
                                                                variant="outlined"
                                                                style={{ width: "8%" }}
                                                                value={doc}
                                                            />
                                                            <TextField
                                                                label="DEPENDENCIA"
                                                                multiline
                                                                maxRows={4}
                                                                variant="filled"
                                                                InputProps={{ readOnly: true }}
                                                                style={{ width: "90%" }}
                                                                value={currentData.institution[docIndex]}
                                                            />
                                                        </div>
                                                    )}
                                                    {docIndex < currentData.docNumber.length - 1 && <br />}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <p className="bigText">OPE/{currentData.docNumber}/2024: {currentData.institution}</p>
                                        </div>
                                    )}
                                </Box>

                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' }, marginBottom: 2 }}>
                                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                            <h1>Solicitud: </h1><br />
                                        </Grid>
                                        <TextField
                                            label="SOLICITUD"
                                            multiline
                                            maxRows={4}
                                            variant="filled"
                                            InputProps={{ readOnly: true }}
                                            style={{ maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
                                            value={currentData.description || ''}
                                        />
                                    </Box>
                                </Grid>

                                {currentData.legalBasis && (
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' }, marginBottom: 2 }}>
                                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                <h1>Fundamento Jurídico: </h1><br />
                                            </Grid>
                                            <TextField
                                                label="FUNDAMENTO JURÍDICO"
                                                multiline
                                                maxRows={10}
                                                variant="filled"
                                                InputProps={{ readOnly: true }}
                                                style={{ maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
                                                value={currentData.legalBasis}
                                            />
                                        </Box>
                                    </Grid>
                                )}

                                {currentData.notes && (
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Box component="section" sx={{ p: 2, border: 1, bgcolor: 'primary.nofocus', '&:hover': { bgcolor: 'primary.dark' }, marginBottom: 2 }}>
                                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                <h1>Observaciones: </h1><br />
                                            </Grid>
                                            <TextField
                                                label="observaciones"
                                                multiline
                                                maxRows={10}
                                                variant="filled"
                                                InputProps={{ readOnly: true }}
                                                style={{ maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
                                                value={currentData.notes}
                                            />
                                        </Box>
                                    </Grid>
                                )}
                            </div>
                        </Grid>
                        <br /><br /><br /><br /><br /><br />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <img src={notfound} />
                    </div>
                )}

                <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                        No hay más elementos en la lista
                    </Alert>
                </Snackbar>

                <div className="footer-search" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button style={{ width: '60px', height: '60px' }} onClick={handlePrevClick}>
                                <img src={flechaizq} alt="Flecha izquierda" style={{ height: '70%' }} />
                            </button>
                            <button style={{ width: '60px', height: '60px' }} onClick={updateData}>
                                <img src={editar} alt="Editar" style={{ height: '70%' }} />
                            </button>
                            <DownloadFile data={data} currentIndex={currentIndex} />
                            <button style={{ width: '60px', height: '60px' }} onClick={handleForwardClick}>
                                <img src={flechaDer} alt="Flecha derecha" style={{ height: '70%' }} />
                            </button>
                        </div>
                        <div style={{ marginTop: '5px' }}>
                            <Pagination
                                count={data.length}
                                page={currentIndex + 1}
                                onChange={handleChangePage}
                                color="secondary"
                            />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Search;
