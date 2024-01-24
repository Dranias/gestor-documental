import './Data.css';

import React, { useState } from 'react';
import { temas, dependencias, customTheme } from './Dataoptions';
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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

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
  const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_POST;

  const navigate = useNavigate();
  let contador = 0;


  //Repetir la sección OPG-Dependencia
  const handleButtonClick = () => {
    contador++;
    const newSection = (
      <div className='container-opg' key={sections.length}>
        <h1>OPG/</h1>
        <TextField
          id={`outlined-basic-${sections.length}`}
          label="OPG"
          variant="outlined"
          style={{ width: '5%' }}
          onChange={(e) => handleOpgChange(contador, e.target.value)}
        />
        <h1>/2024</h1>
        <div style={{ display: 'flex', alignItems: 'center', width: '800px' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dependencias}
            freeSolo
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Dependencia de Turno" />}
            onChange={(event, newValue) => {
              setSelectedInstitution(newValue); // Cambiar el valor seleccionado
              handleDependenciaChange(contador, newValue); // Llamar a tu función con el índice y el nuevo valor
            }}
          />
          <Button variant='contained' onClick={handleButtonClick} style={{ backgroundColor: '#691C32', color: 'white' }}>+</Button>
          {sections.length > 0 && (
            <Button variant='contained' onClick={() => handleRemoveButtonClick(sections.length - 1)} style={{ backgroundColor: '#A6A6A8', color: 'white' }}>-</Button>
          )}
        </div>
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
      <div className='container-opg' key={0}>
        <h1>OPG/</h1>
        <TextField
          id={`outlined-basic-${0}`}
          label="OPG"
          variant="outlined"
          style={{
            width: '5%',
          }}
          onChange={(e) => {
            handleOpgChange(contador, e.target.value);
          }}
        />
        <h1>/2024</h1>
        <div style={{ display: 'flex', alignItems: 'center', width: '800px' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dependencias}
            freeSolo
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Dependencia de Turno" />}
            onChange={(event, newValue) => {
              setSelectedInstitution(newValue); // Cambiar el valor seleccionado
              handleDependenciaChange(0, newValue); // Llamar función con el índice y el nuevo valor
            }}
          />
          <Button variant='contained' onClick={handleButtonClick} style={{ backgroundColor: '#691C32', color: 'white' }}>+</Button>
        </div>
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

  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => []);
  const [textareaContent, setTextareaContent] = useState('');
  const [textarealegal, setTextarealegal] = useState('');
  const [textareaObs, setTextareaObs] = useState('');

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
        openDialog();
        navigate(`/datadisplay`);
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
                  onChange={(e) => settimeValue(e.target.value)} />
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
              </Grid>
            </Grid>
          </div>

          <div className="container-name" style={{ width: '75%' }}>
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
              <div style={{ color: 'red', marginLeft: '10px' }}>
                Este campo no puede estar vacío.
              </div>
            )}
          </div>
          <br />

          <div style={{ width: '95%', marginLeft: '90px' }} >
            {sections.map((section, index) => (
              <React.Fragment key={index}>
                {React.cloneElement(section)}
              </React.Fragment>
            ))}
            <br />
          </div>

          <br />
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
                  <TextareaAutosize
                    value={textarealegal}
                    onChange={(e) => setTextarealegal(e.target.value)}
                    style={{
                      width: '95%',
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
                  <TextareaAutosize
                    value={textareaObs}
                    onChange={(e) => setTextareaObs(e.target.value)}
                    style={{
                      width: '95%',
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

        <div className="footer" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className="button" onClick={handleSendData}>
              Enviar
            </Button>
          </div>
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
            Error al enviar los datos
          </Alert>
        </Snackbar>

        <Dialog
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Envío de datos"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Elementos agregados correctamente a la base de datos.
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
};

export default Data;


