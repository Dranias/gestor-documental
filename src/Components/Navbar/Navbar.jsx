import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../SearchContext';

import search_icon_light from '../../assets/search-w.png';
import gobierno_presente from '../../assets/gobierno-presente.jpg';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_SEARCH;
const apiUrlHome = import.meta.env.VITE_REACT_APP_GESTOR_APP_HOME;



const Navbar = () => {
    
    const { setSearchResults } = useSearch();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(null);

    const goToMain = () => {
        navigate('/');
    };

    const handleSearch = async (query) => {
        try {
            const fullUrl = `${apiUrl}/?query=${query}`;
            const response = await axios.get(fullUrl);
            const searchData = response.data;
            setSearchResults(searchData);
            setCurrentIndex(null);
            navigate('/searchdata');
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    return (
        <div className='navbar'>
            
            <button onClick={goToMain}>
                <img src={gobierno_presente} alt="" className='logo' />
            </button>

            <div className='buttons-container'>
                <Link to="/data" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="inherit" style={{ backgroundColor: '#691C32', fontSize: '20px', color: 'white' }}>
                        Captura
                    </Button>
                </Link>
                <Link to="/datadisplay" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="inherit" style={{ backgroundColor: '#691C32', fontSize: '20px', color: 'white' }}>
                        Ficha
                    </Button>
                </Link>
                <Link to="/checklist" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="inherit" style={{ backgroundColor: '#691C32', fontSize: '20px', color: 'white' }}>
                          Lista  
                    </Button>
                </Link>
            </div>

            <div className='search-box' style={{ backgroundColor: '#691C32', padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder='Buscar'
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '18px', maxWidth: '200px' }}
                />
                <img src={search_icon_light} alt="" />
            </div>
        </div>
    );
};

export default Navbar;