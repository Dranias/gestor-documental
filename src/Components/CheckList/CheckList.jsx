import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { io } from "socket.io-client";
import { useSnackbar } from "../SnackbarContext/SnackbarContext";  // Importar el hook

import React, { useEffect } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';

const Example = () => {

    const [responseData, setResponseData] = React.useState(null);

    // Usar el hook de Snackbar
    const { showSnackbar } = useSnackbar();  // Llamar a la función de Snackbar

    React.useEffect(() => {
        // Conectar con el servidor de Socket.IO
        const socket = io(import.meta.env.VITE_REACT_APP_SOCKET_SERVER_URL);

        // Verificar conexión con un log
        socket.on('connect', () => {
            console.log('Conectado al servidor desde Lista');
        });

        socket.on('List', (newData) => {
            console.log('Evento recibido en front-end:', newData); // Verifica si los datos se reciben correctamente
            showSnackbar(`Alguien entró a la lista`);
        });

        // Verificar si ocurre un error
        socket.on('connect_error', (err) => {
            console.error('Error de conexión a WebSocket:', err);
        });

        // Cleanup al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, [showSnackbar]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_LIST;
                const response = await axios.get(apiUrl);
                const reversedData = Array.isArray(response.data) ? response.data.reverse() : [response.data];
                setResponseData(reversedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = useMemo(() => {
        if (!responseData) return [];

        return responseData.flatMap((item, index) => {
            if (Array.isArray(item.docNumber) && Array.isArray(item.institution)) {
                // Caso en el que ambos son arrays
                return item.docNumber.map((docNumber, i) => ({
                    docNumber: docNumber + '/2025',
                    institution: item.institution[i],
                    name: item.name,
                    description: item.description,
                    notes: item.notes,
                }));
            } else if (Array.isArray(item.docNumber) || Array.isArray(item.institution)) {
                // Caso en el que solo uno de ellos es un array
                const combinedArray = Array.isArray(item.docNumber) ? item.docNumber : item.institution;
                return combinedArray.map((value, i) => ({
                    docNumber: Array.isArray(item.docNumber) ? value + '/2025' : item.docNumber + '/2025',
                    institution: Array.isArray(item.institution) ? item.institution[i] : item.institution,
                    name: item.name,
                    description: item.description,
                    notes: item.notes,
                }));
            } else {
                // Caso en el que ninguno es un array
                return [{
                    docNumber: item.docNumber + '/2025',
                    institution: item.institution,
                    name: item.name,
                    description: item.description,
                    notes: item.notes,
                }];
            }
        });
    }, [responseData]);


    const columns = useMemo(
        () => [
            {
                accessorKey: 'docNumber',
                header: 'OPG',
                size: 30,
            },
            {
                accessorKey: 'institution',
                header: 'Turno',
                size: 100,
            },
            {
                accessorKey: 'name',
                header: 'Remitente',
                size: 100,
            },
            {
                accessorKey: 'description',
                header: 'Solicitud',
                size: 200,
            },
            {
                accessorKey: 'notes',
                header: 'Observaciones',
                size: 100,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box style={{ width: '90%' }}>
                <MaterialReactTable table={table} />
            </Box>
        </Box>
    );
};

export default Example;
