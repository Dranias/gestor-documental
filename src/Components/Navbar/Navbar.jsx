import './Navbar.css';
import Tooltip from '@mui/material/Tooltip';
import search_icon_light from '../../assets/search-w.png';
import gobierno_presente from '../../assets/gobierno-presente.png';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import EditActorsModal from '../Actors/EditActorsModal';

import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../SearchContext';
import { useSnackbar } from '../../Components/SnackbarContext/SnackbarContext';

const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_SEARCH;

const Navbar = () => {
    const [isActorsModalOpen, setIsActorsModalOpen] = useState(false);
    const modalRef = useRef(null); // Para hacer referencia al modal

    const openActorsModal = () => setIsActorsModalOpen(true);
    const closeActorsModal = () => setIsActorsModalOpen(false);

    const { setSearchResults } = useSearch();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(null);

    // Obtener las funciones del contexto
    const { showSnackbar } = useSnackbar();

    const goToMain = () => {
        navigate('/');
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                    <Button variant="contained" color="inherit" style={{ width: '100%', backgroundColor: '#691C32', fontSize: '1em', color: 'white' }}>
                        Captura
                    </Button>
                </Link>
                <Link to="/datadisplay" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="inherit" style={{ width: '100%', backgroundColor: '#691C32', fontSize: '1em', color: 'white' }}>
                        Ficha
                    </Button>
                </Link>
                <Link to="/checklist" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="inherit" style={{ width: '100%', backgroundColor: '#691C32', fontSize: '1em', color: 'white' }}>
                        Lista
                    </Button>
                </Link>
                <Link to="/agenda" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="inherit" style={{ width: '100%', backgroundColor: '#691C32', fontSize: '1em', color: 'white' }}>
                        Agenda
                    </Button>
                </Link>

                <div>
                    <Button
                        variant="contained" color="inherit"
                        style={{ width: '100%', backgroundColor: '#691C32', fontSize: '1em', color: 'white' }}
                        onClick={handleClick}
                    >
                        Datos
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to="/institutions" style={{ textDecoration: 'none' }}>
                            <MenuItem onClick={handleClose}>Dependencias</MenuItem>
                        </Link>

                        <Link to="/issue" style={{ textDecoration: 'none' }}>
                            <MenuItem onClick={handleClose}>Temas</MenuItem>
                        </Link>

                        <MenuItem
                            onClick={(e) => {
                                {/* Evitar que el modal se cierre automáticamente. Esto solucinó un error que al abrir el modal y cambiar entre 
                                    texfields con tabulador, se cerrará*/}
                                e.stopPropagation(); // Detener la propagación para evitar que el menú se cierre
                                openActorsModal();  // Abrir el modal
                            }}
                        >
                            Colaboradores
                        </MenuItem>

                    </Menu>
                </div>
            </div>

            <div className='search-box' style={{ backgroundColor: '#691C32', padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center' }}>
                <Tooltip title={"Busqueda por nombre o número de OPE"} placement="top">
                    <input
                        type="text"
                        placeholder='Buscar'
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '18px', maxWidth: '200px' }}
                    />
                </Tooltip>
                <img src={search_icon_light} alt="" />
            </div>

            {/* Modal de Edición */}
            <EditActorsModal
                open={isActorsModalOpen}
                onClose={closeActorsModal}
                modalRef={modalRef} // Enviar la referencia al modal
            />
        </div>
    );
};

export default Navbar;
