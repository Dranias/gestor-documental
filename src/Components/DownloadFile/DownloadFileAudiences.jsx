import React from "react";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import docxTemplate from "../../assets/Aud.docx";
import buttonPrint from '../../assets/imprimir.png';

const formatDateToLongSpanish = (dateStr) => {
    const date = new Date(dateStr);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('es-MX', options).format(date);
};

const DownloadFileAudiences = ({ data }) => {
    const handleDownload = async () => {
        const response = await fetch(docxTemplate);
        const arrayBuffer = await response.arrayBuffer();

        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Determinar las marcas para Prioridad
        const prioridadSi = data.priority ? "X" : "";
        const prioridadNo = !data.priority ? "X" : "";

        console.log(data);

        // Cargar los datos en la plantilla
        doc.setData({
            Folio: data.folio,
            Nombre: data.name,
            Cargo: data.position,
            Fecha: formatDateToLongSpanish(data.date),
            Solicitud: data.description,
            PrioridadSi: prioridadSi,
            PrioridadNo: prioridadNo,
        });

        try {
            doc.render();
            const blob = doc.getZip().generate({ type: "blob" });
            saveAs(blob, `Audiencia_${data.name}_${data.date}.docx`);
        } catch (error) {
            console.error("Error al generar el documento:", error);
        }
    };

    return (
        <button
            style={{
                width: "60px",
                height: "60px",
                backgroundColor: "transparent",
                border: "none",
            }}
            onClick={handleDownload}
        >
            <img src={buttonPrint} alt="Imprimir" style={{ height: "70%" }} />
        </button>
    );
};

export default DownloadFileAudiences;
