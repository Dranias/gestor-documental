import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

const Example = () => {

    const [responseData, setResponseData] = React.useState(null);

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
                    docNumber: docNumber + '/2024',
                    institution: item.institution[i],
                    name: item.name,
                    description: item.description,
                    notes: item.notes,
                }));
            } else if (Array.isArray(item.docNumber) || Array.isArray(item.institution)) {
                // Caso en el que solo uno de ellos es un array
                const combinedArray = Array.isArray(item.docNumber) ? item.docNumber : item.institution;
                return combinedArray.map((value, i) => ({
                    docNumber: Array.isArray(item.docNumber) ? value + '/2024' : item.docNumber + '/2024',
                    institution: Array.isArray(item.institution) ? item.institution[i] : item.institution,
                    name: item.name,
                    description: item.description,
                    notes: item.notes,
                }));
            } else {
                // Caso en el que ninguno es un array
                return [{
                    docNumber: item.docNumber + '/2024',
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
