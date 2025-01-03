import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import plantilla from '../../assets/ti.docx';
import butprint from '../../assets/imprimir.png';
import Tooltip from '@mui/material/Tooltip';

const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_ACTORS_UPDATE;

const DownloadFile = React.memo(({ data, currentIndex }) => {

    const [actorData, setActorData] = useState({ realiza: '', revisa: '', autoriza: '' });
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga

    // Llamar a la API para obtener los datos de los actores
    useEffect(() => {
        fetchActorData();
    }, []); // Se ejecuta una sola vez cuando el componente se monta

    const fetchActorData = async () => {
        setLoading(true); // Inicia la carga
        try {
            const response = await axios.get(apiUrl);
            const { realiza, revisa, autoriza } = response.data.data; // Suponiendo que estos campos están en la respuesta
            setActorData({
                realiza: realiza || '',
                revisa: revisa || '',
                autoriza: autoriza || ''
            });
        } catch (error) {
            console.error('Error al obtener los datos de los actores:', error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };

    const handleDownloadFile = async () => {
        if (loading) {
            console.log('Cargando datos...');
            return; // No proceder hasta que los datos estén cargados
        }

        try {
            const response = await axios.get(plantilla, {
                responseType: 'arraybuffer',
            });

            const content = new Uint8Array(response.data);
            const zip = new PizZip(content);
            let doc;
            const fechaFormateada = new Date(data[currentIndex].date).toLocaleDateString('es-ES');

            try {
                doc = new Docxtemplater(zip, { linebreaks: true });
            } catch (error) {
                console.error('Error al inicializar docxtemplater:', error);
                return;
            }

            const { realiza, revisa, autoriza } = actorData;
            console.log("Datos:", realiza, revisa, autoriza); // Ahora debería mostrar los datos correctamente

            doc.setData({
                Fecha: fechaFormateada,
                Hora: `${data[currentIndex].time} horas`,
                Nombre: data[currentIndex].name,
                NumDoc: Array.isArray(data[currentIndex].docNumber)
                    ? data[currentIndex].docNumber.map(doc => `OPE/${doc}/2025`).join(', ')
                    : `OPE/${data[currentIndex].docNumber}/2025`,
                SOLICITUD: data[currentIndex].description,
                DEPENDENCIA: Array.isArray(data[currentIndex].docNumber)
                    ? data[currentIndex].docNumber.map((doc, index) => `OPE/${doc}/2025: ${data[currentIndex].institution[index]}`).join('\n')
                    : `OPE/${data[currentIndex].docNumber}/2025: ${data[currentIndex].institution}`,
                FUNDAMENTO: data[currentIndex].legalBasis ? `FUNDAMENTO JURÍDICO\r\n${data[currentIndex].legalBasis}` : '',
                OBSERVACIONES: data[currentIndex].notes ? `OBSERVACIONES\r\n${data[currentIndex].notes}` : '',
                REALIZA: realiza,
                REVISA: revisa,
                AUTORIZA: autoriza 
            });

            try {
                doc.render();
            } catch (error) {
                console.error('Error al renderizar la plantilla:', error);
                return;
            }

            const numDocNames = Array.isArray(data[currentIndex].docNumber)
                ? data[currentIndex].docNumber.join('-')
                : data[currentIndex].docNumber;

            const updatedContent = doc.getZip().generate({ type: 'blob' });
            saveAs(updatedContent, `ti-${numDocNames}.docx`);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <Tooltip title="Imprimir">
            <button style={{ width: '60px', height: '60px' }} onClick={handleDownloadFile}>
                <img src={butprint} alt="Imprimir" style={{ height: '70%' }} />
            </button>
        </Tooltip>
    );
});

export default DownloadFile;
