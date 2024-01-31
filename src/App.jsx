import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Data from './Components/Data/Data';
import Datadisplay from './Components/Datadisplay/Datadisplay';
import Dataperindex from './Components/DataPerIndex/DataPerIndex';
import SearchData from './Components/Search/Search';
import UpdateData from './Components/UpdateData/UpdateData';
import CheckList from './Components/CheckList/CheckList';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="/data" element={<Data />} />
          <Route path="/datadisplay" element={<Datadisplay />} />
          <Route path="/dataperindex/:id/:direction" element={<Dataperindex />} />
          <Route path="/searchdata" element={<SearchData />} />
          <Route path="/updateData/:id" element={<UpdateData />} />
          <Route path="/checklist" element={<CheckList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
