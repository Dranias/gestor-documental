import './DataPerIndex.css'

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { customTheme } from './DataPerIndexoptions';

import flechaDer from '../../assets/f-der.png';
import flechaizq from '../../assets/f-izq.png';
import butprint from '../../assets/imprimir.png';
import editar from '../../assets/editar-archivo.png';
import axios from 'axios';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import plantilla from '../../assets/ti.docx'
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Tooltip from '@mui/material/Tooltip';

const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL;


const DataPerIndex = () => {
    const { id, direction } = useParams();
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const navigate = useNavigate();
    const outerTheme = useTheme();

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const responseData = Array.isArray(response.data) ? response.data.reverse() : [response.data];
                setData(responseData);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    useEffect(() => {
        const index = data.findIndex(item => item.id === id);
        console.log("index: ", index)
        if (direction === 'previous') {
            if (index !== -1 && index > 0) {
                setCurrentIndex(index - 1);
            } else {
                setCurrentIndex(index === 0 ? null : data.length - 1);
            }
        }
        if (direction === 'foward') {
            if (index !== -1) {
                const nextIndex = (index + 1) % data.length;
                setCurrentIndex(nextIndex);
            } else {
                setCurrentIndex(null);
            }
        }
        if (direction === 'dataupdate') {
            if (index !== -1 && index > 0) {
                console.log("Vengo de dataupdate: ", index)
                console.log("index: ", index)
                setCurrentIndex(index !== -1 ? index : null);
            }
        }
    }, [data, id]);

    if (currentIndex === null || currentIndex === -1) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '' }}>
            <div>
                <br />
                <p>No hay más elementos previos.</p>
                <br />
                <br />
                <br />
                <br />
                <div class="loader">
                    <div class="cell d-0"></div>
                    <div class="cell d-1"></div>
                    <div class="cell d-2"></div>

                    <div class="cell d-1"></div>
                    <div class="cell d-2"></div>


                    <div class="cell d-2"></div>
                    <div class="cell d-3"></div>


                    <div class="cell d-3"></div>
                    <div class="cell d-4"></div>


                </div>
            </div>
        </div>
    }

    const handlePrevClick = () => {
        navigate(`/dataperindex/${data[currentIndex]?.id}/previous`);
    };

    const handleFowardClick = () => {
        navigate(`/dataperindex/${data[currentIndex]?.id}/foward`);
    };

    const updateData = () => {
        navigate(`/updateData/${data[currentIndex]?.id}`);
    }

    const handleDownloadFile = async () => {
        console.log(data[currentIndex]);
        try {
            const response = await axios.get(plantilla, {
                responseType: 'arraybuffer',
            });

            const content = new Uint8Array(response.data);
            const zip = new PizZip(content);
            let doc;
            const fechaFormateada = new Date(data[currentIndex].date).toLocaleDateString('es-ES');

            try {
                doc = new Docxtemplater(zip, { linebreaks: true });
            } catch (error) {
                console.error('Error al inicializar docxtemplater:', error);
                return;
            }

            doc.setData({
                Fecha: fechaFormateada,

                Hora: `${data[currentIndex].time} horas`,

                Nombre: data[currentIndex].name,

                NumDoc: Array.isArray(data[currentIndex].docNumber)
                    ? data[currentIndex].docNumber.map(doc => `OPG/${doc}/2024`).join(', ')
                    : `OPG/${data[currentIndex].docNumber}/2024`,

                SOLICITUD: data[currentIndex].description,

                DEPENDENCIA: Array.isArray(data[currentIndex].docNumber)
                    ? data[currentIndex].docNumber.map((doc, index) => `OPG/${doc}/2024: ${data[currentIndex].institution[index]}`).join('\n')
                    : `OPG/${data[currentIndex].docNumber}/2024: ${data[currentIndex].institution}`,

                FUNDAMENTO: data[currentIndex].legalBasis ? `FUNDAMENTO JURÍDICO\r\n${data[currentIndex].legalBasis}` : '',

                OBSERVACIONES: data[currentIndex].notes ? `OBSERVACIONES\r\n${data[currentIndex].notes}` : '',
            });

            try {
                doc.render();
            } catch (error) {
                console.error('Error al renderizar la plantilla:', error);
                return;
            }

            const numDocNames = Array.isArray(data[currentIndex].docNumber)
                ? data[currentIndex].docNumber.join('-')
                : data[currentIndex].docNumber;

            const updatedContent = doc.getZip().generate({ type: 'blob' });
            saveAs(updatedContent, `ti-${numDocNames}.docx`);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <div className="main-container">
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
                                        value={data[currentIndex].folio}
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
                                        value={data[currentIndex].time}
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
                                        value={new Date(data[currentIndex].date).toLocaleDateString()}
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
                                    <Tooltip title={data[currentIndex].issue} placement="top">
                                        <TextField
                                            InputProps={{ readOnly: true }}
                                            id="outlined-basic"
                                            label="TEMA"
                                            variant="outlined"
                                            value={data[currentIndex].issue}
                                        />
                                    </Tooltip>
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
                                        value={data[currentIndex].name}
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
                    </div>
                ) : (
                    <p className="bigText">No se encontraron datos o el formato no es un array.</p>
                )}
                <div className="footer-perIndex" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Tooltip title="Anterior">
                            <button style={{ width: '60px', height: '60px', display: direction === 'dataupdate' ? 'none' : 'block' }} onClick={handlePrevClick}>
                                {/*display: direction === 'dataupdate' ? 'none' : 'block'*/}
                                <img src={flechaizq} alt="Flecha izquierda" style={{ height: '70%' }} />
                            </button>
                        </Tooltip>
                        <Tooltip title="Actualizar">
                            <button style={{ width: '60px', height: '60px' }} onClick={updateData}>
                                <img src={editar} alt="Editar" style={{ height: '70%' }} />
                            </button >
                        </Tooltip>
                        <Tooltip title="Imprimir ficha">
                            <button style={{ width: '60px', height: '60px' }} onClick={handleDownloadFile}>
                                <img src={butprint} alt="Imprimir" style={{ height: '70%' }} />
                            </button>
                        </Tooltip>
                        <Tooltip title="Siguente">
                            <button style={{ width: '60px', height: '60px', display: direction === 'dataupdate' ? 'none' : 'block' }} onClick={handleFowardClick}>
                                <img src={flechaDer} alt="Flecha derecha" style={{ height: '70%' }} />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </ThemeProvider>
        </div >
    );
};

export default DataPerIndex;
