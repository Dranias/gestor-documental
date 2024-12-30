import React from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import plantilla from '../../assets/ti.docx';
import butprint from '../../assets/imprimir.png';
import Tooltip from '@mui/material/Tooltip';

const DownloadFile = React.memo(({ data, currentIndex }) => {
    const handleDownloadFile = async () => {
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

            doc.setData({
                Fecha: fechaFormateada,
                Hora: `${data[currentIndex].time} horas`,
                Nombre: data[currentIndex].name,
                NumDoc: Array.isArray(data[currentIndex].docNumber)
                    ? data[currentIndex].docNumber.map(doc => `OPE/${doc}/2024`).join(', ')
                    : `OPE/${data[currentIndex].docNumber}/2024`,
                SOLICITUD: data[currentIndex].description,
                DEPENDENCIA: Array.isArray(data[currentIndex].docNumber)
                    ? data[currentIndex].docNumber.map((doc, index) => `OPE/${doc}/2024: ${data[currentIndex].institution[index]}`).join('\n')
                    : `OPE/${data[currentIndex].docNumber}/2024: ${data[currentIndex].institution}`,
                FUNDAMENTO: data[currentIndex].legalBasis ? `FUNDAMENTO JURÍDICO\r\n${data[currentIndex].legalBasis}` : '',
                OBSERVACIONES: data[currentIndex].notes ? `OBSERVACIONES\r\n${data[currentIndex].notes}` : '',
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
