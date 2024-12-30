import React, { createContext, useState, useContext } from 'react';

// Crear el contexto para el Snackbar
const SnackbarContext = createContext();

// Proveedor del contexto
export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const hideSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ snackbarOpen, snackbarMessage, showSnackbar, hideSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

// Hook para usar el contexto
export const useSnackbar = () => {
    return useContext(SnackbarContext);
};
