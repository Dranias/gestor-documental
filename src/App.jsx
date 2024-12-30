import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

import Alerts from './Components/Alerts/Alerts';  // Asegúrate de importar el componente Alerts

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Alerts />
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
