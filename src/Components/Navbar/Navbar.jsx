import './Navbar.css';
import Tooltip from '@mui/material/Tooltip';
import search_icon_light from '../../assets/search-w.png';
import home_icon from '../../assets/home.png';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditActorsModal from '../Actors/EditActorsModal';

import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../../SearchContext';
import { useSnackbar } from '../../Components/SnackbarContext/SnackbarContext';

const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_SEARCH;

const Navbar = () => {
    const [isActorsModalOpen, setIsActorsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const openActorsModal = () => setIsActorsModalOpen(true);
    const closeActorsModal = () => setIsActorsModalOpen(false);

    const { setSearchResults } = useSearch();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const goToMain = () => {
        navigate('/');
    };

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
            setSearchResults(response.data);
            navigate('/searchdata');
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    const isActive = (path) => location.pathname === path;

    const NavButton = ({ to, label }) => (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <Button
                variant="contained"
                color="inherit"
                style={{
                    width: '100%',
                    backgroundColor: isActive(to) ? '#2c41a0' : '#4782d6',
                    fontSize: '1em',
                    color: 'white'
                }}
            >
                {label}
            </Button>
        </Link>
    );

    return (
        <div className='navbar'>

            <button
                onClick={goToMain}
                style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '5px',
                    cursor: 'pointer'
                }}
            >
                <img src={home_icon} alt="Inicio" style={{ width: '60px', height: '60px' }} />
            </button>

            <div className='buttons-container'>
                <NavButton to="/data" label="Captura" />
                <NavButton to="/datadisplay" label="Ficha" />
                <NavButton to="/checklist" label="Lista" />
                <NavButton to="/audiences" label="Audiencias" />
                <NavButton to="/agenda" label="Agenda" />

                <div>
                    <Button
                        variant="contained"
                        color="inherit"
                        style={{
                            width: '100%',
                            backgroundColor: isActive('/institutions') || isActive('/issue') ? '#2c5aa0' : '#4782d6',
                            fontSize: '1em',
                            color: 'white'
                        }}
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
                                e.stopPropagation();
                                openActorsModal();
                            }}
                        >
                            Colaboradores
                        </MenuItem>
                    </Menu>
                </div>
            </div>

            <div className='search-box' style={{ backgroundColor: '#97b8e6', padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center' }}>
                <Tooltip title={"Búsqueda por nombre o número de OPE"} placement="top">
                    <input
                        type="text"
                        placeholder='Buscar'
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'black',
                            fontSize: '18px',
                            maxWidth: '200px'
                        }}
                    />
                </Tooltip>
                <img src={search_icon_light} alt="Buscar" />
            </div>

            <EditActorsModal
                open={isActorsModalOpen}
                onClose={closeActorsModal}
                modalRef={modalRef}
            />
        </div>
    );
};

export default Navbar;
