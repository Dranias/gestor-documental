import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Snackbar } from '@mui/material'; // Asegúrate de importar el componente Snackbar
import SnackbarContent from '@mui/material/SnackbarContent'; // También para mostrar el contenido personalizado

import Navbar from './Components/Navbar/Navbar';
import Data from './Components/Data/Data';
import Datadisplay from './Components/Datadisplay/Datadisplay';
import Dataperindex from './Components/DataPerIndex/DataPerIndex';
import SearchData from './Components/Search/Search';
import UpdateData from './Components/UpdateData/UpdateData';
import CheckList from './Components/CheckList/CheckList';
import Institutions from './Components/Institutions/Institutions';
import Invitations from './Components/Invitations/InvitationsList';
import Issue from './Components/Issue/Issue';
import Agenda from './Components/Agenda/Agenda';
import Audiences from './Components/Audiences/Audiences';
import Alerts from './Components/Alerts/Alerts';

import { SnackbarProvider, useSnackbar } from './Components/SnackbarContext/SnackbarContext';

const App = () => {
  return (
    <SnackbarProvider>
      <Router>
        <div className='container'>
          <Navbar />
          <Alerts />
          <Routes>
            <Route path="/" />
            <Route path="/data" element={<Data />} />
            <Route path="/datadisplay" element={<Datadisplay />} />
            <Route path="/dataperindex/:id/:direction" element={<Dataperindex />} />
            <Route path="/updateData/:id" element={<UpdateData />} />
            <Route path="/searchdata" element={<SearchData />} />
            <Route path="/checklist" element={<CheckList />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/issue" element={<Issue />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/audiences" element={<Audiences />} />
          </Routes>
          <SnackbarGlobal />
        </div>
      </Router>
    </SnackbarProvider>
  );
};

// Componente global del Snackbar
const SnackbarGlobal = () => {
  const { snackbarOpen, snackbarMessage, hideSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000} // Duración de 6 segundos
      onClose={hideSnackbar} // Cerrar el Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Posición en la esquina superior derecha
    >
      <SnackbarContent
        message={snackbarMessage}
        style={{
          backgroundColor: '#4caf50', // Color verde para éxito
          color: '#fff', // Texto blanco
        }}
      />
    </Snackbar>
  );
};

export default App;
