import './UpdateData.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { temas, dependencias, customTheme } from '../Data/Dataoptions';
import { TextField, Grid, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import minus from '../../assets/minus.png';

const UpdateData = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTemaValid, setIsTemaValid] = useState(true);
    const [folioValue, setFolioValue] = useState('');
    const [timeValue, settimeValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedissue, setSelectedissue] = useState(temas[0]);
    const [nameValue, setNameValue] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState(null)
    const [OPGs, setOPGs] = useState([]);
    const [dependenciesarray, setDependenciesarray] = useState([]);
    const [textareaContent, setTextareaContent] = useState('');
    const [textarealegal, setTextarealegal] = useState('');
    const [textareaObs, setTextareaObs] = useState('');
    const [alignment, setAlignment] = React.useState('left');
    const [textareaError, setTextareaError] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
    const [openDialogs, setOpenDialog] = React.useState(false);
    const [opgId, setOpgId] = useState('');

    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_PATCH;
    const apiGetbyId = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_BYID;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fullUrl = `${apiGetbyId}/${id}`;
                const response = await fetch(fullUrl);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const jsonData = await response.json();
                setData(jsonData.data);
                setFolioValue(jsonData.data.folio);
                settimeValue(jsonData.data.time);
                setSelectedDate(dayjs(jsonData.data.fecha));
                setSelectedissue(jsonData.data.issue);
                setNameValue(jsonData.data.name);
                setTextareaContent(jsonData.data.description);
                setTextarealegal(jsonData.data.legalBasis || "");
                setTextareaObs(jsonData.data.notes || "");
                setOpgId(jsonData.data.id);

                // Iterar sobre data.docNumber y data.institution
                jsonData.data.docNumber.forEach((num, index) => {
                    setOPGs(prevOPGs => {
                        const updatedOPGs = [...prevOPGs];
                        if (index >= updatedOPGs.length) {
                            updatedOPGs.push(...Array(index - updatedOPGs.length + 1).fill(''));
                        }
                        updatedOPGs[index] = num;
                        return updatedOPGs;
                    });

                    setData(prevData => {
                        const newData = { ...prevData };
                        newData.docNumber = newData.docNumber.map((numb, i) => (i === index ? num : numb));
                        setOPGs(newData.docNumber); // Actualiza OPGs con los nuevos valores
                        return newData;
                    });

                });

                jsonData.data.institution.forEach((institution, index) => {
                    setDependenciesarray(prevdependenciesarray => {
                        const updateddependenciesarray = [...prevdependenciesarray];
                        if (index >= updateddependenciesarray.length) {
                            updateddependenciesarray.push(...Array(index - updateddependenciesarray.length + 1).fill(''));
                        }
                        updateddependenciesarray[index] = institution;
                        return updateddependenciesarray.filter(dep => dep !== null);
                    });

                    setData(prevData => {
                        const newData = { ...prevData };
                        newData.institution[index] = institution;
                        setDependenciesarray(newData.institution.filter(dep => dep !== null)); // Actualiza dependenciesarray con los nuevos valores
                        return newData;
                    });

                });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>;
    }

    if (!data) {
        return <p>No se encontró la información para el ID proporcionado.</p>;
    }

    const handleOpgChange = (index, value) => {
        setOPGs(prevOPGs => {
            const updatedOPGs = [...prevOPGs];
            if (index >= updatedOPGs.length) {
                updatedOPGs.push(...Array(index - updatedOPGs.length + 1).fill(''));
            }
            updatedOPGs[index] = value;
            return updatedOPGs;
        });

        setData(prevData => {
            const newData = { ...prevData };
            newData.docNumber = newData.docNumber.map((num, i) => (i === index ? value : num));
            setOPGs(newData.docNumber); // Actualiza OPGs con los nuevos valores
            return newData;
        });
    };

    const handleDependenciaChange = (index, value) => {
        setDependenciesarray(prevdependenciesarray => {
            const updateddependenciesarray = [...prevdependenciesarray];
            if (index >= updateddependenciesarray.length) {
                updateddependenciesarray.push(...Array(index - updateddependenciesarray.length + 1).fill(''));
            }
            updateddependenciesarray[index] = value;
            return updateddependenciesarray.filter(dep => dep !== null);
        });

        setData(prevData => {
            const newData = { ...prevData };
            newData.institution[index] = value;
            setDependenciesarray(newData.institution.filter(dep => dep !== null)); // Actualiza dependenciesarray con los nuevos valores
            return newData;
        });
    };

    const deleteLabel = (arraytoDelete) => {
        const cantidadElementos = arraytoDelete.length;
        let contador = 0;
        let contenidoObjeto = [];

        if (cantidadElementos > 0) {
            arraytoDelete.forEach((element, index) => {
                if (typeof element === 'object' && element !== null && element.hasOwnProperty('label')) {
                    const { label } = element;
                    const nombre = label.replace(/.*?"/g, ''); // Eliminar todo antes de las comillas dobles
                    contenidoObjeto[contador] = nombre;
                } else {
                    contenidoObjeto[contador] = element;
                }
                contador++;
            });
        } else {
        }
        return contenidoObjeto;
    };

    const handleSendData = () => {

        const fullUrl = `${apiUrl}/${id}`;

        if (!nameValue.trim() || !textareaContent.trim() || dependenciesarray.some(dep => (dep && typeof dep === 'object' ? !dep.label.trim() : !dep.trim()))) {
            setErrorSnackbarOpen(true);
            setTextareaError(true);
            return;
        }

        if (!selectedissue) {
            setErrorSnackbarOpen(true);
            setIsTemaValid(false);
            return;
        }

        setSelectedissue(selectedissue ? selectedissue.label : null);

        const filteresdependenciesarray = deleteLabel(dependenciesarray);

        // Limpiar el estado de error si la validación es exitosa
        setTextareaError(false);

        const updatedData = {
            folio: folioValue,
            date: selectedDate ? selectedDate.toISOString() : null,
            issue: typeof selectedissue === 'object' ? selectedissue.label : selectedissue,
            name: nameValue,
            docNumber: OPGs,
            institution: filteresdependenciesarray,
            description: textareaContent,
            legalBasis: textarealegal,
            notes: textareaObs,
            time: timeValue,
        };

        console.log("Id", opgId);
        axios.patch(fullUrl, updatedData)
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                openDialog();
                navigate(`/dataperindex/${opgId}/dataupdate`);
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
                if (error.response && error.response.data && error.response.data.message === 'El número de documento ya existe') {
                    setErrorSnackbarOpen(true);
                } else {
                    setErrorSnackbarOpen(true);
                }
            });
    };

    const openDialog = () => {
        setOpenDialog(true);
    };

    const deleteOPG = (indice) => {
        setOPGs(prevOPGs => {
            const updatedOPGs = [...prevOPGs];
            updatedOPGs.splice(indice, 1);
            return updatedOPGs;
        });

        setDependenciesarray(prevDependencies => {
            const updatedDependencies = [...prevDependencies];
            updatedDependencies.splice(indice, 1);
            return updatedDependencies;
        });

        setData(prevData => {
            const newData = { ...prevData };
            newData.docNumber = newData.docNumber.filter((_, i) => i !== indice);
            newData.institution = newData.institution.filter((_, i) => i !== indice);
            return newData;
        });
    };


    return (
        <div>
            <div className="title">
                <h1>Modificar datos</h1>
            </div>

            <div className="content-container">
                <Grid container className='grid' >
                    <Grid item>
                        <TextField
                            id="outlined-basic"
                            label="Folio"
                            variant="outlined"
                            value={folioValue}
                            onChange={(e) => setFolioValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="outlined-basic"
                            label="Hora"
                            variant="outlined"
                            value={timeValue}
                            onChange={(e) => settimeValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Fecha (MM/DD/AAAA)"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    slotProps={{ textField: { variant: 'outlined' } }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={temas}
                            freeSolo
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tema"
                                    error={!isTemaValid}
                                    helperText={!isTemaValid ? 'El tema no puede estar vacío' : ''}
                                />
                            )}
                            onChange={(event, newValue) => {
                                setSelectedissue(newValue || temas[0]); // Assign a default value if newValue is null
                                setIsTemaValid(true);
                            }}
                            value={selectedissue}
                        />

                    </Grid>
                </Grid>

                <div className="container-name" style={{ width: '75%' }}>
                    <TextField id="outlined-basic"
                        label="Nombre y/o cargo"
                        variant="filled"
                        style={{ width: "95%" }}
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        spellCheck="true"
                        helperText={nameValue.trim() ? '' : 'Campo requerido'}
                        error={!nameValue.trim()}
                    />
                </div>
                <br />

                {/* Sección que se repetirá según la longitud de numDoc e institution */}
                <div style={{ width: '95%', marginLeft: '90px' }} >
                    {data.docNumber && data.docNumber.map((num, index) => (
                        <div className='container-opg' key={index}>
                            <h1>OPG/</h1>
                            <TextField
                                id={`outlined-basic-${index}`}
                                label="OPG"
                                variant="outlined"
                                style={{
                                    width: '70px',
                                }}
                                value={num}
                                //llamarlo desde aquí exactamente a handleOpgChange con algo similar a ngoninit 
                                onChange={(e) => {
                                    handleOpgChange(index, e.target.value);
                                }}
                            />
                            <h1>/2024</h1>
                            <h1>Dependencia: </h1>
                            <div style={{ display: 'flex', alignItems: 'center', width: '800px' }}>
                                <Autocomplete
                                    disablePortal
                                    id={`combo-box-demo-${index}`}
                                    options={dependencias}
                                    freeSolo
                                    sx={{ width: 600 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Dependencia de Turno"
                                        />
                                    )}
                                    value={data.institution[index]}
                                    onChange={(event, newValue) => {
                                        setSelectedInstitution(newValue);
                                        handleDependenciaChange(index, newValue);
                                    }}
                                />
                                {data.docNumber.length > 1 && (
                                    <button style={{ width: '50px', height: '50px', backgroundColor: 'transparent', border: 'none' }} onClick={() => deleteOPG(index)} >
                                        <img src={minus} alt="Flecha derecha" style={{ height: '80%' }} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Fin de la sección repetida */}

                <Box className="text-containers" style={{ width: '80%' }}>
                    <div className="container-issue">
                        <Typography variant="h6" style={{ color: '#691C32', marginLeft: '20px' }}>
                            Asunto:
                        </Typography>
                        <TextareaAutosize
                            value={textareaContent}
                            onChange={(e) => {
                                setTextareaContent(e.target.value);
                                setTextareaError(false);
                            }}
                            style={{
                                width: '95%',
                                minHeight: '150px',
                                border: '5px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                fontSize: '20px',
                                textAlign: alignment,
                                borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                            }}
                        />
                        {textareaError && (
                            <div style={{ color: 'red', marginLeft: '10px' }}>
                                Este campo no puede estar vacío.
                            </div>
                        )}
                    </div>

                    <div className="container-issue">
                        <Typography variant="h6" style={{ color: '#691C32', marginLeft: '20px' }}>
                            Fundamento Legal:
                        </Typography>
                        <TextareaAutosize
                            value={textarealegal}
                            onChange={(e) => {
                                setTextarealegal(e.target.value);
                            }}
                            style={{
                                width: '95%',
                                minHeight: '150px',
                                border: '5px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                fontSize: '20px',
                                textAlign: alignment,
                            }}
                        />
                    </div>

                    <div className="container-issue">
                        <Typography variant="h6" style={{ color: '#691C32', marginLeft: '20px' }}>
                            Observaciones
                        </Typography>
                        <TextareaAutosize
                            value={textareaObs}
                            onChange={(e) => {
                                setTextareaObs(e.target.value);
                            }}
                            style={{
                                width: '95%',
                                minHeight: '150px',
                                border: '5px solid #ccc',
                                borderRadius: '4px',
                                padding: '8px',
                                marginTop: '10px',
                                marginLeft: '10px',
                                fontSize: '20px',
                                textAlign: alignment,
                            }}
                        />
                    </div>
                </Box>

                <div className="footer" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button className="button" color="inherit" style={{ backgroundColor: '#095240', fontSize: '20px', color: 'white' }} onClick={handleSendData}>
                            Modificar
                        </Button>
                    </div>
                </div>

            </div>
        </div >

    );
};

export default UpdateData;
