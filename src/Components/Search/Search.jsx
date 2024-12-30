import './Search.css'
import DownloadFile from '../DownloadFile/DownloadFile';

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useSearch } from '../../SearchContext';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { customTheme } from './Searchoptions';

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
            // Muestra la Snackbar cuando alcanzas el límite hacia atrás
            setOpenSnackbar(true);
        }
    };

    const handleForwardClick = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            // Muestra la Snackbar cuando alcanzas el límite
            setOpenSnackbar(true);
        }
    };

    const handleChangePage = (event, value) => {
        setCurrentIndex(value - 1);
    };

    const updateData = () => {
        navigate(`/updateData/${data[currentIndex]?.id}`);
    }

    return (
        <div>
            <ThemeProvider theme={customTheme(outerTheme)}>
                {Array.isArray(data) && data.length > 0 ? (
                    <div className="content-container">
                        <div className="title">
                            <h1>Registros</h1> <br />
                        </div>
                        <Grid container className='grid'>
                            <Grid item>
                                <Box component="section"
                                    sx={{
                                        p: 2, border: 1,
                                        bgcolor: 'primary.nofocus',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                    }}
                                >
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        id="outlined-basic"
                                        label="FOLIO"
                                        variant="outlined"
                                        value={data[currentIndex]?.folio || ''}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="section" sx={{
                                    p: 2, border: 1,
                                    bgcolor: 'primary.nofocus',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        id="outlined-basic"
                                        label="HORA"
                                        variant="outlined"
                                        value={data[currentIndex]?.time || 'N/A'}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="section" sx={{
                                    p: 2, border: 1,
                                    bgcolor: 'primary.nofocus',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        id="outlined-basic"
                                        label="FECHA"
                                        variant="outlined"
                                        value={
                                            data[currentIndex]?.date
                                                ? new Date(data[currentIndex].date).toLocaleDateString()
                                                : "Fecha no disponible"
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box component="section" sx={{
                                    p: 2, border: 1,
                                    bgcolor: 'primary.nofocus',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}>
                                    <TextField
                                        InputProps={{ readOnly: true }}
                                        id="outlined-basic"
                                        label="TEMA"
                                        variant="outlined"
                                        value={data[currentIndex]?.issue || 'N/A'}
                                    />
                                </Box>
                            </Grid>

                            <div className='texfields-containers' style={{ width: '70%' }}>
                                <Box component="section" sx={{
                                    p: 2, border: 1,
                                    bgcolor: 'primary.nofocus',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                    marginBottom: 2,
                                }}>
                                    <TextField
                                    InputProps={{ readOnly: true }}
                                    id="outlined-basic"
                                    label="NOMBRE"
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    value={
                                        data[currentIndex]?.name
                                            ? data[currentIndex].name
                                            : "Nombre no disponible"
                                    }
                                />
                                </Box>

                                {/* OPG y dependencia */}
                                <Box component="section" sx={{
                                    p: 2, border: 1,
                                    bgcolor: 'primary.nofocus',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                    marginBottom: 2,
                                }}>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <h1>Turno: </h1><br />
                                    </Grid>
                                    {Array.isArray(data[currentIndex].docNumber) ? (
                                        <div style={{ textAlign: 'center' }}>
                                            {data[currentIndex].docNumber.map((doc, docIndex) => (
                                                <div key={docIndex}>
                                                    {data[currentIndex].institution[docIndex] && (
                                                        <div>
                                                            <TextField
                                                                InputProps={{ readOnly: true }}
                                                                id="standard-basic"
                                                                label="OPG"
                                                                variant="outlined"
                                                                style={{ width: "8%" }}
                                                                value={doc}
                                                            />
                                                            <TextField
                                                                id="filled-multiline-flexible"
                                                                label="DEPENDENCIA"
                                                                multiline
                                                                maxRows={4}
                                                                variant="filled"
                                                                InputProps={{ readOnly: true }}
                                                                style={{ width: "90%" }}
                                                                value={data[currentIndex].institution[docIndex]}
                                                            />
                                                        </div>
                                                    )}
                                                    {docIndex < data[currentIndex].docNumber.length - 1 && <br />}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <p className="bigText">OPG/{data[currentIndex].docNumber}/2024: {data[currentIndex].institution}</p>
                                        </div>
                                    )}
                                </Box>

                                {/* Descripción */}
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <div>
                                        <Box component="section" sx={{
                                            p: 2, border: 1,
                                            bgcolor: 'primary.nofocus',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                            marginBottom: 2,
                                        }}>
                                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                <h1>Solicitud: </h1><br />
                                            </Grid>
                                            <TextField
                                                id="filled-multiline-flexible"
                                                label="SOLICITUD"
                                                multiline
                                                maxRows={4}
                                                variant="filled"
                                                InputProps={{ readOnly: true }}
                                                style={{ maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
                                                value={data[currentIndex].description}
                                            />
                                        </Box>
                                    </div>
                                </Grid>

                                {/* Fundamento jurídico */}
                                {data[currentIndex].legalBasis && (
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Box component="section" sx={{
                                            p: 2, border: 1,
                                            bgcolor: 'primary.nofocus',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                            marginBottom: 2,
                                        }}>
                                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                <h1>Fundamento Jurídico: </h1><br />
                                            </Grid>
                                            <TextField
                                                id="filled-multiline-flexible"
                                                label="FUNDAMENTO JURÍDICO"
                                                multiline
                                                maxRows={10}
                                                variant="filled"
                                                InputProps={{ readOnly: true }}
                                                style={{ maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
                                                value={data[currentIndex].legalBasis}
                                            />
                                        </Box>
                                    </Grid>
                                )}

                                {/* Observaciones */}
                                {data[currentIndex].notes && (
                                    <div>
                                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                            <Box component="section" sx={{
                                                p: 2, border: 1,
                                                bgcolor: 'primary.nofocus',
                                                '&:hover': {
                                                    bgcolor: 'primary.dark',
                                                },
                                                marginBottom: 2,
                                            }}>
                                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                    <h1>Observaciones: </h1><br />
                                                </Grid>
                                                <TextField
                                                    id="filled-multiline-flexible"
                                                    label="observaciones"
                                                    multiline
                                                    maxRows={10}
                                                    variant="filled"
                                                    InputProps={{ readOnly: true }}
                                                    style={{ maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
                                                    value={data[currentIndex].notes}
                                                />
                                            </Box>
                                        </Grid>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
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
        </div >
    );
};

export default Search;
