import './Data.css';

import React, { useState, useEffect } from 'react';
import { customTheme } from './Dataoptions';
import { TextField, Grid, Button } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Data = () => {

  const outerTheme = useTheme();
  const [folioValue, setFolioValue] = useState('');
  const [timeValue, settimeValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedissue, setSelectedissue] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [OPGs, setOPGs] = useState([]);
  const [dependenciesarray, setDependenciesarray] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
  const [openDialogs, setOpenDialog] = React.useState(false);
  const [textareaError, setTextareaError] = useState(false);
  const [isTemaValid, setIsTemaValid] = useState(true);
  const [dialogMessage, setdialogMessage] = useState('');
  const [dialogTitle, setdialogTitle] = useState('');
  const [institutions, setDependencias] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_POST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_INSTITUTIONS;
        const response = await axios.get(apiUrl);
        const dependenciasData = response.data.map(item => ({ label: item.institution }));
        setDependencias(dependenciasData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_ISSUE;
      const response = await axios.get(apiUrl);
      const issueData = await response.data.map(item => ({ label: item.issue }));
      setIssues(issueData);
    };
    fetchData()
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!loading && institutions.length > 0) {
      setSections([
        createNewSection(0)
      ]);
    }
  }, [institutions, loading]);

  const createNewSection = (index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        id={`outlined-basic-${index}`}
        label="OPG"
        variant="outlined"
        style={{
          width: '8.8%',
          marginRight: '10px',
        }}
        onChange={(e) => handleOpgChange(index, e.target.value)}
      />
      <Autocomplete
        disablePortal
        id={`combo-box-demo-${index}`}
        options={institutions}
        freeSolo
        sx={{ width: '80%' }}
        renderInput={(params) => <TextField {...params} label="Dependencia de Turno" />}
        onChange={(event, newValue) => {
          setSelectedInstitution(newValue);
          handleDependenciaChange(index, newValue);
        }}
      />
      <Button variant='contained' onClick={handleButtonClick} style={{ backgroundColor: '#691C32', color: 'white', marginLeft: '10px' }}>+</Button>
      {sections.length > 0 && (
        <Button variant='contained' onClick={() => handleRemoveButtonClick(index)} style={{ backgroundColor: '#A6A6A8', color: 'white' }}>-</Button>
      )}
    </div>
  );

  const navigate = useNavigate();
  let contador = 0;

  //Repetir la sección OPG-Dependencia
  const handleButtonClick = () => {
    contador++;
    const newSection = (
      <div key={sections.length} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          id={`outlined-basic-${sections.length}`}
          label="OPG"
          variant="outlined"
          style={{
            width: '10%',
            marginRight: '10px',
            marginTop: '15px',
          }}
          onChange={(e) => handleOpgChange(contador, e.target.value)}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={institutions}
          freeSolo
          sx={{ width: "90%" }}
          renderInput={(params) => <TextField {...params} label="Dependencia de Turno" style={{ marginTop: '15px' }} />}
          onChange={(event, newValue) => {
            setSelectedInstitution(newValue);
            handleDependenciaChange(contador, newValue);
          }}
        />
        <Button variant='contained' onClick={handleButtonClick} style={{ backgroundColor: '#691C32', color: 'white' }}>+</Button>
        {sections.length > 0 && (
          <Button variant='contained' onClick={() => handleRemoveButtonClick(sections.length - 1)} style={{ backgroundColor: '#A6A6A8', color: 'white' }}>-</Button>
        )}
      </div>
    );
    setSections(prevSections => {
      const updatedSections = [...prevSections, newSection];
      return updatedSections;
    });
  };


  //Sección OPG-Dependencia Original
  const [sections, setSections] = useState([
    (
      <div key={0} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          id={`outlined-basic-${0}`}
          label="OPG"
          variant="outlined"
          style={{
            width: '8.8%',
            marginRight: '10px',
          }}
          onChange={(e) => {
            handleOpgChange(contador, e.target.value);
          }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={institutions}
          freeSolo
          sx={{ width: '80%' }}
          renderInput={(params) => <TextField {...params} label="Dependencia de Turno" />}
          onChange={(event, newValue) => {
            setSelectedInstitution(newValue);
            handleDependenciaChange(0, newValue);
          }}
        />
        <Button variant='contained' onClick={handleButtonClick} style={{ backgroundColor: '#691C32', color: 'white', marginLeft: '10px' }}>+</Button>
      </div>
    ),
  ]);

  const handleConfirmIssue = () => {
    if (selectedissue && typeof selectedissue !== 'object') {
      const newIssue = { label: selectedissue, value: selectedissue };
      setSelectedissue(newIssue);
    }
  };

  const handleOpgChange = (index, value) => {
    setOPGs(prevOPGs => {
      const updatedOPGs = [...prevOPGs];

      // Si el índice supera la longitud actual de OPGs, llenar con valores vacíos
      if (index >= updatedOPGs.length) {
        updatedOPGs.push(...Array(index - updatedOPGs.length + 1).fill(''));
      }

      updatedOPGs[index] = value; // Asignar el valor al índice proporcionado
      return updatedOPGs; // Devolver el nuevo arreglo actualizado de OPGs
    });
  };

  const handleDependenciaChange = (index, value) => {

    setDependenciesarray(prevdependenciesarray => {
      const updateddependenciesarray = [...prevdependenciesarray];

      if (index >= updateddependenciesarray.length) {
        updateddependenciesarray.push(...Array(index - updateddependenciesarray.length + 1).fill(''));
      }

      updateddependenciesarray[index] = value;
      return updateddependenciesarray;
    });
  };

  const handleRemoveButtonClick = () => {
    setSections(prevSections => {
      const updatedSections = [...prevSections];
      updatedSections.pop(); // Elimina el último elemento
      return updatedSections;
    });
  };

  const [textareaContent, setTextareaContent] = useState('');
  const [textarealegal, setTextarealegal] = useState('');
  const [textareaObs, setTextareaObs] = useState('');

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const deleteLabel = (arraytoDelete) => {
    const cantidadElementos = arraytoDelete.length;
    let contador = 0;
    let contenidoObjeto = [];
    console.log(`El array dependenciesarray tiene ${cantidadElementos} elementos:`);

    if (cantidadElementos > 0) {
      console.log('Elementos:');
      arraytoDelete.forEach((element, index) => {
        if (typeof element === 'object' && element !== null && element.hasOwnProperty('label')) {
          console.log(`[${index + 1}] Objeto: ${JSON.stringify(element)}`);

          const { label } = element;
          const nombre = label.replace(/.*?"/g, ''); // Eliminar todo antes de las comillas dobles
          contenidoObjeto[contador] = nombre;
        } else {
          console.log(`[${index + 1}] ${element}`);
          contenidoObjeto[contador] = element;
        }
        contador++;
      });

      console.log("Array: ", contenidoObjeto);
    } else {
      console.log('El array dependenciesarray está vacío.');
    }
    return contenidoObjeto;
  };

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackbarOpen(false);
  };

  const openDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSendData = () => {

    if (!nameValue.trim() || !textareaContent.trim() || OPGs.some(opg => !opg.trim())) {
      setErrorSnackbarOpen(true);
      setTextareaError(true);
      return;
    }

    if (!selectedissue) {
      setErrorSnackbarOpen(true);
      setIsTemaValid(false);
      return;
    }

    const newIssue = selectedissue ? { label: selectedissue.label, value: selectedissue.value } : null;
    setSelectedissue(newIssue);

    const filteresdependenciesarray = deleteLabel(dependenciesarray);

    // Limpiar el estado de error si la validación es exitosa
    setTextareaError(false);

    const newData = {
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

    axios.post(apiUrl, newData)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        if (response.data.message === 'Hoja de datos creada exitosamente') {
          setdialogTitle("Agregado existoso");
          setdialogMessage("Datos agregados correctamente, será redirigido a la Ficha Informativa");
          openDialog();
        }
        navigate(`/datadisplay`);
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);

        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage === 'El número de documento ya existe' && error.response.status === 400) {
            setdialogTitle("Error al enviar los datos");
            setdialogMessage("Número de OPG ya existe en la base de datos.");
            openDialog();
          } else {
            setErrorSnackbarOpen(true);
          }
        } else {
          setErrorSnackbarOpen(true);
        }
      });

  };

  // --------   principal   -------
  return (
    <div className='texfields-containers' style={{ width: '100%' }}>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <div>
          <div className="title">
            <h1>Formulario de registro</h1>
          </div>

          <div className="content-container">
              <Grid container className='grid' >
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
                      id="outlined-basic"
                      label="Folio"
                      variant="outlined"
                      value={folioValue}
                      onChange={(e) => setFolioValue(e.target.value)}
                    />
                  </Box>
                </Grid>

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
                      id="outlined-basic"
                      label="Hora"
                      variant="outlined"
                      value={timeValue}
                      onChange={(e) => settimeValue(e.target.value)} />
                  </Box>
                </Grid>

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
                  </Box>
                </Grid>

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
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={issues}
                      sx={{ width: 300 }}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label="Tema"
                          error={!isTemaValid}
                          helperText={!isTemaValid ? 'El tema no puede estar vacío' : ''}
                        />
                      }
                      onChange={(event, newValue) => {
                        setSelectedissue(newValue);
                        setIsTemaValid(true);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleConfirmIssue();
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
          </div>

          <div className="container-name" style={{ width: '75%' }}>
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
                id="outlined-basic"
                label="Nombre y/o cargo"
                variant="filled"
                style={{
                  width: "100%",
                  borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                }}
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                  setTextareaError(false); // Limpiar el estado de error al cambiar el contenido
                }}
                spellCheck="true"
              />
              {textareaError && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  Este campo no puede estar vacío.
                </div>
              )}
            </Box>
          </div>

          <br />

          <div className='container-opg' >
            <Box component="section"
              style={{ width: '100%' }}
              sx={{
                p: 2, border: 1,
                bgcolor: 'primary.nofocus',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {!loading && institutions.length > 0 && sections.map((section, index) => (
                <React.Fragment key={index}>
                  {React.cloneElement(section)}
                </React.Fragment>
              ))
              }
            </Box>
          </div>

          <br />
          <Box className="text-containers" style={{ width: '100%' }}>
            <div className="container-issue">
              <Box component="section"
                sx={{
                  p: 2, border: 1,
                  bgcolor: 'primary.nofocus',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <Typography variant="h6" style={{ color: '#691C32', marginLeft: '20px' }}>
                  Asunto:
                </Typography>

                <textarea
                  rows={4}
                  value={textareaContent}
                  onChange={(e) => {
                    setTextareaContent(e.target.value);
                    setTextareaError(false);
                  }}
                  style={{
                    width: '98%',
                    minHeight: '15%',
                    border: '3px solid #9e2f5f',
                    borderRadius: '10px',
                    padding: '8px',
                    marginTop: '10px',
                    marginLeft: '10px',
                    fontSize: '20px',
                    borderColor: textareaError ? 'red' : '#ccc', // Cambiar el color del borde en caso de error
                  }}
                />
                {textareaError && (
                  <div style={{ color: 'red', marginLeft: '10px' }}>
                    Este campo no puede estar vacío.
                  </div>
                )}
              </Box>
            </div>


            <div className="accordion-container" style={{ marginTop: '20px' }}>
              <Accordion style={{ backgroundColor: '#D6D1C4' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ color: '#691C32' }}>Fundamento Jurídico</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <textarea
                    rows={4}
                    value={textarealegal}
                    onChange={(e) => setTextarealegal(e.target.value)}
                    style={{
                      width: '98%',
                      minHeight: '150px',
                      border: '5px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      marginTop: '10px',
                      fontSize: '20px',
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="accordion-container" style={{ marginTop: '20px' }}>
              <Accordion style={{ backgroundColor: '#D6D1C4' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="observaciones-text">Observaciones</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <textarea
                    rows={4}
                    value={textareaObs}
                    onChange={(e) => setTextareaObs(e.target.value)}
                    style={{
                      width: '98%',
                      minHeight: '150px',
                      border: '5px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      marginTop: '10px',
                      fontSize: '20px',
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Box>
        </div>

        <div className="footer">
          <button className="button" style={{ backgroundColor: '#095240', fontSize: '20px', color: 'white' }} onClick={handleSendData}>
            Registrar
          </button>
        </div>
      </ThemeProvider>

      <div className="snackbar">
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleErrorSnackbarClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert onClose={handleErrorSnackbarClose} severity="error">
            Error en el registro.
          </Alert>
        </Snackbar>

        <Dialog
          open={openDialogs}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );

}

export default Data;