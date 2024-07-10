import { createTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const temas = [
  { label: 'Abastecimiento de agua potable' },
  { label: 'Acoso escolar' },
  { label: 'Acuerdo del Congreso del Estado' },
  { label: 'Adeudos de servicios básicos' },
  { label: 'Adeudos municipales' },
  { label: 'Administrativo' },
  { label: 'Adquicisión de uniformes' },
  { label: 'Adscripción de docentes' },
  { label: 'Afectación de parcelas' },
  { label: 'Agradecimiento' },
  { label: 'Alertas epidemiológicas' },
  { label: 'Ambulancia' },
  { label: 'Amparos' },
  { label: 'Aportación estatal' },
  { label: 'Aportaciones a municipios' },
  { label: 'Apoyo cultural' },
  { label: 'Apoyo de agricultura' },
  { label: 'Apoyo de aparato auditivo' },
  { label: 'Apoyo de devolución de fondo de pensiones ISSSTEP' },
  { label: 'Apoyo de escrituración' },
  { label: 'Apoyo de infraestructura ' },
  { label: 'Apoyo de instalaciones' },
  { label: 'Apoyo de predio' },
  { label: 'Apoyo de programas' },
  { label: 'Apoyo de salud' },
  { label: 'Apoyo económico' },
  { label: 'Apoyo económico en materia de seguridad' },
  { label: 'Apoyo económico para carnaval' },
  { label: 'Apoyo educativo' },
  { label: 'Apoyo empresarial' },
  { label: 'Apoyo en descuentos de trámites' },
  { label: 'Apoyo en prestaciones' },
  { label: 'Apoyo en programas federales' },
  { label: 'Apoyo escolar' },
  { label: 'Apoyo gubernamental' },
  { label: 'Apoyo INFONAVIT' },
  { label: 'Apoyo jurídico' },
  { label: 'Apoyo laboral' },
  { label: 'Apoyo médico' },
  { label: 'Apoyo para evento' },
  { label: 'Apoyo para eventos' },
  { label: 'Apoyo para mobiliarios' },
  { label: 'Apoyo para pago de luz' },
  { label: 'Apoyo para pagos de servicios' },
  { label: 'Apoyo religioso' },
  { label: 'Apoyo rural' },
  { label: 'Apoyo social' },
  { label: 'Apoyo Teleton' },
  { label: 'Apoyo vial' },
  { label: 'Apoyo zona militar' },
  { label: 'Aprobación en el Congreso' },
  { label: 'Asesoría Jurídica' },
  { label: 'Asignación de horas a docente' },
  { label: 'Asignación de horas docente' },
  { label: 'Asignación de personal' },
  { label: 'Asignación de recursos económicos' },
  { label: 'Asignación personal de la salud' },
  { label: 'Asistencia al migrante' },
  { label: 'Asistencia jurídica' },
  { label: 'Asistencia jurídica laboral' },
  { label: 'Asistencia laboral' },
  { label: 'Asistencia legal' },
  { label: 'Asistencia médica' },
  { label: 'Asistencia migratoria' },
  { label: 'Asistencia para niños' },
  { label: 'Asistencia social' },
  { label: 'Asitencia jurídica' },
  { label: 'Asuntos de Ayuntamiento' },
  { label: 'Asuntos de municipio' },
  { label: 'Atención médica' },
  { label: 'Audiencia' },
  { label: 'Auditorías' },
  { label: 'Aumento salarial' },
  { label: 'Base laboral' },
  { label: 'Becas' },
  { label: 'Bienes e inmuebles estatales' },
  { label: 'Bienes muebles' },
  { label: 'Bienes Muebles e Inmuebles' },
  { label: 'Bienestar animal' },
  { label: 'Búsqueda de Personas' },
  { label: 'Cambio de adscripción' },
  { label: 'Cambio de horario laboral' },
  { label: 'Camión recolector de basura' },
  { label: 'Campaña de donación' },
  { label: 'Campaña médica' },
  { label: 'Cañones anti granizo' },
  { label: 'Capacitación' },
  { label: 'Catastro' },
  { label: 'Categoría de comunidad' },
  { label: 'Categoria laboral' },
  { label: 'Categorización de ranchería' },
  { label: 'CDH' },
  { label: 'Centro de reinserción' },
  { label: 'Centro de salud' },
  { label: 'Centros penitenciarios' },
  { label: 'Certificado' },
  { label: 'Certificados' },
  { label: 'CFE' },
  { label: 'Ciudadano' },
  { label: 'Clave educativa' },
  { label: 'CNDH' },
  { label: 'Código administrativo' },
  { label: 'Código laboral' },
  { label: 'Coflicto social' },
  { label: 'Colecta Cruz Roja' },
  { label: 'Comisariados' },
  { label: 'Comisión de búsqueda' },
  { label: 'Comité de vecinos' },
  { label: 'Compensación económica' },
  { label: 'Compra de inmobiliario gubernamental' },
  { label: 'Concesiones' },
  { label: 'Condonación de impuestos' },
  { label: 'Condonación de multas' },
  { label: 'Condonación de predial' },
  { label: 'Conflico social' },
  { label: 'Conflicto con agua potable' },
  { label: 'Conflicto cultural' },
  { label: 'Conflicto educativo' },
  { label: 'Conflicto escolar' },
  { label: 'Conflicto gubernamental' },
  { label: 'Conflicto laboral' },
  { label: 'Conflicto municipal' },
  { label: 'Conflicto por explotación de agua de riego' },
  { label: 'Conflicto social' },
  { label: 'Conflicto social municipal por limites territoriales' },
  { label: 'Conflicto social y cultural' },
  { label: 'Conflicto social y de medio ambiente' },
  { label: 'Conflicto territoriales' },
  { label: 'Conflicto Vecinal' },
  { label: 'Congreso' },
  { label: 'Congreso del Estado' },
  { label: 'Congreso del Estado de Puebla' },
  { label: 'Consejo de Cronistas' },
  { label: 'Construcción de hospital' },
  { label: 'Construcción de un centro de salud' },
  { label: 'Contaminación a hidrocarburos' },
  { label: 'Contaminación ambiental' },
  { label: 'Contestación a petición' },
  { label: 'Contratación de personal' },
  { label: 'Contratación de personal docente' },
  { label: 'Contratación de personal municipal' },
  { label: 'Contratos de proyectos' },
  { label: 'Control vehicular' },
  { label: 'Convenciones y parques' },
  { label: 'Convenio' },
  { label: 'Convenio federal' },
  { label: 'Convenios' },
  { label: 'Convenios federale' },
  { label: 'Convenios federales' },
  { label: 'Convocatoria' },
  { label: 'Convocatoria docente' },
  { label: 'Convocatoria estatal' },
  { label: 'Corección de acta' },
  { label: 'Creación de escuela' },
  { label: 'Creación de juzgados' },
  { label: 'Creación de panteón' },
  { label: 'Creación de servicio de Tercel' },
  { label: 'Creación de universidad' },
  { label: 'Cultura' },
  { label: 'Cultural' },
  { label: 'Decreto' },
  { label: 'Decreto de desincorporación de predio' },
  { label: 'Decreto de donación' },
  { label: 'Decreto en el periódico' },
  { label: 'Decreto estatal' },
  { label: 'Decreto municipal' },
  { label: 'Demandas' },
  { label: 'Denuncia ilegal de pozo' },
  { label: 'Deporte' },
  { label: 'Deportes' },
  { label: 'Deportivo' },
  { label: 'Derecho de Preferencia' },
  { label: 'Derechos Humanos' },
  { label: 'Desabasto de agua' },
  { label: 'Desabasto de agua potable' },
  { label: 'Desarrollo Rural' },
  { label: 'Desastres naturales' },
  { label: 'Desfile 5 de mayo' },
  { label: 'Designación de enlace' },
  { label: 'Designación de funcionario' },
  { label: 'Designación de servidor público' },
  { label: 'Desincoporación de predio' },
  { label: 'Desincorporación de Predio' },
  { label: 'Desincorporaciónde predio' },
  { label: 'Despensas' },
  { label: 'Despido' },
  { label: 'Despido injustificado' },
  { label: 'Despojo' },
  { label: 'Difusión de información' },
  { label: 'Docente' },
  { label: 'Donación de inmueble' },
  { label: 'Donación de parcelas' },
  { label: 'Donación de predio' },
  { label: 'Donación de predios' },
  { label: 'Donación de vehículo' },
  { label: 'Economía' },
  { label: 'Económico' },
  { label: 'Educativo' },
  { label: 'Ejecución de Obra' },
  { label: 'Empleo' },
  { label: 'Emprendendores' },
  { label: 'Enajenación de los predios' },
  { label: 'Enajenación de parcela' },
  { label: 'Energía eléctrica' },
  { label: 'Energía renovable' },
  { label: 'Enlace' },
  { label: 'Equipamiento de hospital' },
  { label: 'Escolar' },
  { label: 'Escritura' },
  { label: 'Escrituración' },
  { label: 'Escrituración de inmuebles' },
  { label: 'Escuela rural' },
  { label: 'Estimulo laboral' },
  { label: 'Evalúo del inmueble' },
  { label: 'Eventos' },
  { label: 'Eventos de ajedrez' },
  { label: 'Examen de confianza policial' },
  { label: 'Exhorto' },
  { label: 'Exhorto a la cámara' },
  { label: 'Exhorto de la cámara' },
  { label: 'Exhorto de la CNDH' },
  { label: 'Exhorto del Congreso' },
  { label: 'Exhorto del Congreso de Puebla' },
  { label: 'Exhorto del Estado' },
  { label: 'Exhorto del Senado' },
  { label: 'Expo-ciencia' },
  { label: 'Expropiación' },
  { label: 'Fe de errata' },
  { label: 'Federal' },
  { label: 'Feria de Puebla' },
  { label: 'Finiquito' },
  { label: 'Firma de Gobernador' },
  { label: 'Fiscalía' },
  { label: 'Fotomultas' },
  { label: 'Fotomultas ciudadanas' },
  { label: 'Gasto educativo' },
  { label: 'Gobierno' },
  { label: 'Gratuidad' },
  { label: 'Horas docente' },
  { label: 'Hospitalario' },
  { label: 'Hospitales' },
  { label: 'IEE' },
  { label: 'Inconformidad' },
  { label: 'Incremento de horas' },
  { label: 'Incremento salarial' },
  { label: 'Indemnización de afectación a inmueble' },
  { label: 'Indemnización por obra' },
  { label: 'Indulto' },
  { label: 'INE' },
  { label: 'INEGI' },
  { label: 'Informa nombramiento' },
  { label: 'Información de eventos' },
  { label: 'Informativo' },
  { label: 'Informe' },
  { label: 'Informe Comisión de Búsqueda' },
  { label: 'Informe de gobierno' },
  { label: 'Informe de resultados' },
  { label: 'Informe Estatal' },
  { label: 'Informe federal' },
  { label: 'Informe Municipal' },
  { label: 'Informes' },
  { label: 'Informes municipales' },
  { label: 'Infraestructura' },
  { label: 'Infraestructura de Planteles Educativos' },
  { label: 'Infraestructura Educativa' },
  { label: 'Infraestructura Física Educativa' },
  { label: 'Infraestructura municipal' },
  { label: 'Inmobiliario educativo' },
  { label: 'Inmobiliario estatal' },
  { label: 'Inmueble' },
  { label: 'Inmueble educativo' },
  { label: 'Inmueble Municipal' },
  { label: 'Inmuebles' },
  { label: 'Inseguridad' },
  { label: 'Inspección' },
  { label: 'Instalación de cuartel Guardia Nacional' },
  { label: 'Institucional' },
  { label: 'Instrumentos musicales' },
  { label: 'Interno gobierno' },
  { label: 'Invasión de inmuebles' },
  { label: 'Invitación' },
  { label: 'Jubilación' },
  { label: 'Jubilados' },
  { label: 'Juicio laboral' },
  { label: 'Junta de Gobierno' },
  { label: 'Jurídico' },
  { label: 'Laboral' },
  { label: 'Laboral, educatitvo' },
  { label: 'Ley de ingresos' },
  { label: 'Ley de ingresos ' },
  { label: 'Libros de educación' },
  { label: 'Licencia' },
  { label: 'Licencia de conducir' },
  { label: 'Licencia de transporte' },
  { label: 'Licencias' },
  { label: 'Lotes de ejido' },
  { label: 'Magistrado' },
  { label: 'Magistrados' },
  { label: 'Marbetes' },
  { label: 'Material ' },
  { label: 'Material explosivo' },
  { label: 'Médico' },
  { label: 'Medio Ambiente' },
  { label: 'Mercados' },
  { label: 'Mesa de trabajo' },
  { label: 'Mesa directiva de fraccionamiento' },
  { label: 'Migrantes' },
  { label: 'Movilidad' },
  { label: 'Movilidad urbana' },
  { label: 'Movilidad víal' },
  { label: 'Municipal' },
  { label: 'Municipales' },
  { label: 'Nombramiento' },
  { label: 'Nombramiento de personal' },
  { label: 'Notaría' },
  { label: 'Notarias' },
  { label: 'Notarías' },
  { label: 'Obra ' },
  { label: 'Obra CFE' },
  { label: 'Obra de iglesia' },
  { label: 'Obra de salud' },
  { label: 'Obra deportiva' },
  { label: 'Obra educativa' },
  { label: 'Obra escolar' },
  { label: 'Obra muncipal' },
  { label: 'Obra municipal' },
  { label: 'Obra municipales' },
  { label: 'Obra pública' },
  { label: 'Obra social' },
  { label: 'Obras' },
  { label: 'Obras educativa' },
  { label: 'Obras Municipales' },
  { label: 'Obras públicas' },
  { label: 'Operación' },
  { label: 'Pago a proveedores' },
  { label: 'Pago de contrato' },
  { label: 'Pago de prestaciones' },
  { label: 'Pago de salario' },
  { label: 'Pago devengado' },
  { label: 'Parcela' },
  { label: 'Parcelas' },
  { label: 'Participación ciudadana' },
  { label: 'Patrulla' },
  { label: 'Patrullas' },
  { label: 'Pensión' },
  { label: 'Periodismo' },
  { label: 'Personal educativo' },
  { label: 'Plaza educativa' },
  { label: 'Plazas de educación' },
  { label: 'Político' },
  { label: 'Popocatépetl' },
  { label: 'PPL' },
  { label: 'Predial' },
  { label: 'Predio' },
  { label: 'Predio escolar' },
  { label: 'Predios' },
  { label: 'Prestaciones laborales' },
  { label: 'Presupuesto de Egresos' },
  { label: 'Presupuesto educativo' },
  { label: 'Presupuesto federal' },
  { label: 'Problema escolar' },
  { label: 'Problema laboral educativo' },
  { label: 'Problema social' },
  { label: 'Procesos legislativos' },
  { label: 'Programa carreteras artesanales' },
  { label: 'Programa de bienestar' },
  { label: 'Programa de regularización de predios' },
  { label: 'Programa de Regularización de Predios Rústicos' },
  { label: 'Programa federal' },
  { label: 'Programas de apoyo' },
  { label: 'Proovedores' },
  { label: 'Protección animal' },
  { label: 'Protección civil' },
  { label: 'Proveedor' },
  { label: 'Proveedores' },
  { label: 'Proyecto ciudadano' },
  { label: 'Proyectos' },
  { label: 'Publicación en el Periódico Oficial del Estado' },
  { label: 'Queja' },
  { label: 'Queja a escuela' },
  { label: 'Queja a función pública' },
  { label: 'Queja a funcionario' },
  { label: 'Queja a Notaría Pública' },
  { label: 'Queja a servicio público' },
  { label: 'Queja a transporte público' },
  { label: 'Queja ciudadana' },
  { label: 'Queja por obra municipal' },
  { label: 'Queja verificentro' },
  { label: 'Ratificación de personal' },
  { label: 'Reapertura de escuela' },
  { label: 'Reasignación de docentes' },
  { label: 'Recategorización' },
  { label: 'Recomendaciones' },
  { label: 'Reconocimiento público' },
  { label: 'Recontratación' },
  { label: 'Recurso de consideración' },
  { label: 'Recurso federal' },
  { label: 'Recursos federales' },
  { label: 'Recursos Municipales' },
  { label: 'Recursos Municipales de Seguridad' },
  { label: 'Red de agua potable' },
  { label: 'Red de distribución de agua potable y tomas domiciliarias' },
  { label: 'Reforestación' },
  { label: 'Registro Civil' },
  { label: 'Registro SOAPAP' },
  { label: 'Regularización' },
  { label: 'Regularización a escuela' },
  { label: 'Regularización de concesiones sobre el agua' },
  { label: 'Regularización de construcciones' },
  { label: 'Regularización de inmuebles' },
  { label: 'Regularización de predio' },
  { label: 'Regularización de predios' },
  { label: 'Regularización de taxis' },
  { label: 'Regularización de transporte' },
  { label: 'Regularización del predio escolar' },
  { label: 'Regularización educativa' },
  { label: 'Reinstalación' },
  { label: 'Reinstalación laboral' },
  { label: 'Relaciones exteriores' },
  { label: 'Relleno sanitario' },
  { label: 'Renuncia' },
  { label: 'Repertura de CAIC' },
  { label: 'Resintalación laboral' },
  { label: 'Solicitud de respuesta' },
  { label: 'Restauración de inmuebles por sismo' },
  { label: 'Retiro de árbol' },
  { label: 'Reunión' },
  { label: 'Reuniones de trabajo' },
  { label: 'Río Atoyac' },
  { label: 'Seguridad Pública' },
  { label: 'Seguridad y servicios municipales' },
  { label: 'Seguro social' },
  { label: 'Ofrece productos o servicios' },
  { label: 'Sesión Municipal' },
  { label: 'Simulacro nacional' },
  { label: 'Solicitud de aprobación en el Congreso' },
  { label: 'Solicitud de armamento' },
  { label: 'Solicitud de empleo' },
  { label: 'Solicitud de información' },
  { label: 'Solicitud de Inmueble' },
  { label: 'Solicitud de instrumentos musicales' },
  { label: 'Solicitud de material para instituciones educativas' },
  { label: 'Solicitud de pago  a personal docente' },
  { label: 'Solicitud de pago a proveedor' },
  { label: 'Solicitud de plaza base' },
  { label: 'Solicitud de plazas' },
  { label: 'Solicitud de publicación en el periódico' },
  { label: 'subsidio ordinario' },
  { label: 'Suministro de agua potable' },
  { label: 'Tarifa de transporte' },
  { label: 'Telecomunicaciones' },
  { label: 'Tema administrativo educativo' },
  { label: 'Tema de liquidación' },
  { label: 'Tema de solicitud de gratuidad' },
  { label: 'Tema laboral' },
  { label: 'Tema municipal' },
  { label: 'Trámites gubernamentales' },
  { label: 'Temas de Ayuntamiento' },
  { label: 'Titulación' },
  { label: 'Títulos de propiedad' },
  { label: 'Transparencia' },
  { label: 'Transporte Público' },
  { label: 'Transportes privados' },
  { label: 'Traslado de personas privadas de la libertad' },
  { label: 'Uso de espacios gubernamentales' },
  { label: 'Verificación vehícular' },
  { label: 'Víctima de delito' },
  { label: 'Violencia de Género' },
  { label: 'Instalación de drenaje' },
  { label: 'Alumbrado público' },
  { label: 'Permiso para negocio' },
  { label: 'Rehabilitación de parques' }
];

export const dependencias = [
  { label: 'Auditoría Superior del Estado' },
  { label: 'Bienes Muebles e Inmuebles de la Secretaría de Administración' },
  { label: 'Benemérita Universidad Autónoma de Puebla' },
  { label: 'Centro INAH Puebla' },
  { label: 'Colegio Mexicano de Podólogos Siglo XXI A.C.' },
  { label: 'Comisión Ejecutiva Estatal de Atención a Víctimas' },
  { label: 'Comisión de Búsqueda de Personas del Estado' },
  { label: 'Comisión Estatal de Vivienda en Puebla' },
  { label: 'Consejo de la Judicatura del Poder Judicial del Estado de Puebla' },
  { label: 'Consejería Jurídica' },
  { label: 'Coordinación General de Comunicación y Agenda Digital' },
  { label: 'Coordinación General de Protección Civil' },
  { label: 'Coordinadora General Administrativa del Ejecutivo del Estado de Puebla' },
  { label: 'Dirección de Apoyo Técnico Legal de la Secretaría de Planeación y Finanzas' },
  { label: 'Coordinación de Atención Ciudadana' },
  { label: 'Coordinación General Administrativa del Ejecutivo del Estado' },
  { label: 'Coordinación Estatal del OPD IMSS-Bienestar' },
  { label: 'Dirección del Archivo General del Estado' },
  { label: 'Dirección de Convenciones y Parques' },
  { label: 'Dirección de Operación de Casa Puebla y Espacios de Desarrollo Familiar y Comunitario' },
  { label: 'Dirección General del Instituto Poblano del Deporte' },
  { label: 'Dirección del Registro Público de la Propiedad' },
  { label: 'Dirección del Sistema de Información y Comunicación' },
  { label: 'Dirección General de Carreteras de Cuota-Puebla' },
  { label: 'Dirección General de Gobierno' },
  { label: 'Dirección General de Inspección del Trabajo' },
  { label: 'Dirección General del Colegio de Estudios Científicos y Tecnológicos' },
  { label: 'Dirección General de la Agencia de Energía del Estado' },
  { label: 'Dirección General de la Comisión Estatal de Agua y Saneamiento de Puebla' },
  { label: 'Dirección General de Tenencia de la Tierra y Población' },
  { label: 'Dirección General del Colegio de Bachilleres del Estado de Puebla' },
  { label: 'Dirección General del Instituto de Educación Digital del Estado de Puebla' },
  { label: 'Dirección General del Instituto de Seguridad y Servicios Sociales de los Trabajadores al Servicio de los Poderes del Estado de Puebla' },
  { label: 'Dirección General del Instituto Poblano de Asistencia al Migrante' },
  { label: 'Dirección General del Instituto Registral y Catastral' },
  { label: 'Dirección General del Notariado' },
  { label: 'Dirección General del Organismo Público Descentralizado denominado Museos Puebla' },
  { label: 'Dirección General del Organismo Público Descentralizado denominado Comité Administrador Poblano para la Construcción de Espacios Educativos' },
  { label: 'Dirección General del Registro del Estado Civil de las Personas' },
  { label: 'Dirección General del Sistema Estatal de Telecomunicaciones' },
  { label: 'Dirección General del Sistema Operador de los Servicios de Agua Potable y Alcantarillado de Puebla' },
  { label: 'Dirección General del Sistema para el Desarrollo Integral de la Familia del Estado de Puebla' },
  { label: 'Dirección Local de la Comisión Nacional del Agua' },
  { label: 'Encargado de Despacho de la Dirección General del Sistema para el Desarrollo Integral de la Familia del Estado de Puebla' },
  { label: 'Fiscalía General del Estado' },
  { label: 'Honorable Ayuntamiento de Acajete' },
  { label: 'Honorable Ayuntamiento de Acatzingo' },
  { label: 'Honorable Ayuntamiento de Acteopan' },
  { label: 'Honorable Ayuntamiento de Ahuatlán' },
  { label: 'Honorable Ayuntamiento de Ahuacatlán' },
  { label: 'Honorable Ayuntamiento de Ahuazotepec' },
  { label: 'Honorable Ayuntamiento de Ajalpan' },
  { label: 'Honorable Ayuntamiento de Amozoc' },
  { label: 'Honorable Ayuntamiento de Atlixco' },
  { label: 'Honorable Ayuntamiento de Caxhuacan' },
  { label: 'Honorable Ayuntamiento de Chalchicomula de Sesma' },
  { label: 'Honorable Ayuntamiento de Chapulco' },
  { label: 'Honorable Ayuntamiento de Chiautla de Tapia' },
  { label: 'Honorable Ayuntamiento de Chichiquila' },
  { label: 'Honorable Ayuntamiento de Chietla' },
  { label: 'Honorable Ayuntamiento de Chignahuapan' },
  { label: 'Honorable Ayuntamiento de Chilchotla' },
  { label: 'Honorable Ayuntamiento de Coronango' },
  { label: 'Honorable Ayuntamiento de Coxcatlán' },
  { label: 'Honorable Ayuntamiento de Cuautlancingo' },
  { label: 'Honorable Ayuntamiento de Cuapiaxtla de Madero' },
  { label: 'Honorable Ayuntamiento de Cuayuca de Andrade' },
  { label: 'Honorable Ayuntamiento de Cuetzalan del Progreso' },
  { label: 'Honorable Ayuntamiento de Eloxochitlán' },
  { label: 'Honorable Ayuntamiento de Hermenegildo Galeana' },
  { label: 'Honorable Ayuntamiento de Huachinango' },
  { label: 'Honorable Ayuntamiento de Huauchinango' },
  { label: 'Honorable Ayuntamiento de Huehuetlán el Grande' },
  { label: 'Honorable Ayuntamiento de Huejotzingo' },
  { label: 'Ayuntamiento de San Sebastián Tlacotepec' },
  { label: 'Presidente y Rector de la Universidad Anglo Hispano Mexicana' },
  { label: 'Ayuntamiento de Venustiano Carranza' },
  { label: 'Honorable Ayuntamiento de Hueytamalco' },
  { label: 'Honorable Ayuntamiento de Izúcar de Matamoros' },
  { label: 'Honorable ayuntamiento de Juan N. Méndez' },
  { label: 'Honorable Ayuntamiento de Los Reyes de Juárez' },
  { label: 'Honorable Ayuntamiento de Miahuatlán' },
  { label: 'Honorable Ayuntamiento de Nicolás Bravo' },
  { label: 'Honorable Ayuntamiento de Nealticán' },
  { label: 'Honorable Ayuntamiento de Nopalucan' },
  { label: 'Honorable Ayuntamiento de Puebla' },
  { label: 'Honorable Ayuntamiento de Quecholac' },
  { label: 'Honorable Ayuntamiento de Quimixtlán' },
  { label: 'Honorable Ayuntamiento de San Andrés Cholula' },
  { label: 'Honorable Ayuntamiento de Calpan' },
  { label: 'Honorable Ayuntamiento de San José Miahuatlán' },
  { label: 'Honorable Ayuntamiento de San Martín Texmelucán' },
  { label: 'Honorable Ayuntamiento de San Matias Tlalancaleca' },
  { label: 'Honorable Ayuntamiento de San Miguel Xoxtla' },
  { label: 'Honorable Ayuntamiento de San Pedro Cholula' },
  { label: 'Honorable Ayuntamiento de Santa Isabel Cholula' },
  { label: 'Honorable Ayuntamiento de Santa Rita Tlahuapan' },
  { label: 'Honorable Ayuntamiento de Santiago Miahuatlán' },
  { label: 'Honorable Ayuntamiento de Soltepec' },
  { label: 'Honorable Ayuntamiento de Tecali de Herrera' },
  { label: 'Honorable Ayuntamiento de Tecamachalco' },
  { label: 'Honorable Ayuntamiento de Tehuacán' },
  { label: 'Honorable Ayuntamiento de Tenampulco' },
  { label: 'Honorable Ayuntamiento de Teopantlán' },
  { label: 'Honorable Ayuntamiento de Tepanco de López' },
  { label: 'Honorable Ayuntamiento de Tepeaca' },
  { label: 'Honorable Ayuntamiento de Tepeojuma' },
  { label: 'Honorable Ayuntamiento de Tepexi de Rodríguez' },
  { label: 'Honorable Ayuntamiento de Tetela de Ocampo' },
  { label: 'Honorable Ayuntamiento de Teziutlán' },
  { label: 'Honorable Ayuntamiento de Tlacotepec de Benito Juárez' },
  { label: 'Honorable Ayuntamiento de Tlacuilotepec' },
  { label: 'Honorable Ayuntamiento de Tlahuapan' },
  { label: 'Honorable Ayuntamiento de Tlapanalá' },
  { label: 'Honorable Ayuntamiento de Tlatlauquitepec' },
  { label: 'Honorable Ayuntamiento de Tochtepec' },
  { label: 'Honorable Ayuntamiento de Xicotepec' },
  { label: 'Honorable Ayuntamiento de Xicotepec de Juárez' },
  { label: 'Honorable Ayuntamiento de Vicente Guerrero' },
  { label: 'Honorable Ayuntamiento de Xochitlán de Vicente Suárez' },
  { label: 'Honorable Ayuntamiento de Yaonahuac' },
  { label: 'Honorable Ayuntamiento de Zacapala' },
  { label: 'Honorable Ayuntamiento de Zacatlán' },
  { label: 'Honorable Ayuntamiento de Zaragoza' },
  { label: 'Instituto Poblano de los Pueblos Indígenas' },
  { label: 'Instituto de la Defensoría Pública del Poder Judicial del Estado' },
  { label: 'Instituto Estatal de Educación para Adultos' },
  { label: 'Instituto Poblano de la Juventud' },
  { label: 'Jefatura de Oficina de Presidencia del SEDIF' },
  { label: 'Junta Local de Conciliación y Arbitraje del Estado' },
  { label: 'Órgano Interno de Control en la Secretaría Particular del Titular del Ejecutivo del Estado' },
  { label: 'Procuraduría de la Defensa del Trabajo' },
  { label: 'Procuraduría Federal de la Defensa del Trabajo' },
  { label: 'Representante del Instituto Nacional del Suelo Sustentable' },
  { label: 'Subsecretaria para la Gestión del Desarrollo Urbano del la Secretaría de Medio Ambiente, Desarrollo Susntentable y Ordenamiento Territorial' },
  { label: 'Secretaría de Administración' },
  { label: 'Secretaría de Bienestar' },
  { label: 'Secretaría de Cultura' },
  { label: 'Secretaría de Desarrollo Rural' },
  { label: 'Gerencia de Asuntos Legales del SOAPAP' },
  { label: 'Secretaría de Economía' },
  { label: 'Secretaría de Educación' },
  { label: 'Secretaría de Gobernación' },
  { label: 'Oficina de Representación en Puebla de la Secretaría de Agricultura y Desarrollo Rural' },
  { label: 'Secretaría de Igualdad Sustantiva' },
  { label: 'Secretaría de Infraestructura' },
  { label: 'Secretaría de la Función Pública' },
  { label: 'Secretaría de Medio Ambiente Desarrollo Sustentable y Ordenamiento Territorial' },
  { label: 'Secretaría de Movilidad y Transporte' },
  { label: 'Secretaría de Planeación y Finanzas' },
  { label: 'Secretaría de Salud' },
  { label: 'Secretaría de Seguridad Pública' },
  { label: 'Secretaría de Trabajo' },
  { label: 'Secretaría de Turismo' },
  { label: 'Secretaría Ejecutiva del Sistema de Protección Integral de los Derechos de Niñas Niños y Adolescentes del Estado de Puebla' },
  { label: 'Sistema Estatal Anticorrupción' },
  { label: 'Subsecretaría de Infraestructura' },
  { label: 'Dirección General del Centro de SCT Puebla' },
  { label: 'Secretaría Ejecutiva del Consejo Estatal de Coordinación del Sistema Nacional de Seguridad Pública' },
  { label: 'Coordinación General de Órganos de Vigilancia y Control de la Secretaría de la Función Pública' },
  { label: 'Sin trámite' },
  { label: 'Delegación del Registro Agrario Nacional en Puebla' },
  { label: 'Unidad de Transparencia de la Oficina del Gobernador' },
  { label: 'Universidad de la Salud' },
  { label: 'Comisión de la DGETAyCM en Puebla' }, 
  { label: 'Comisión de Derechos Humanos del Estado de Puebla' },
  { label: 'Universidad Tecnológica de Puebla' }
];

export const useDependencias  = () => {
  const [dependencias, setDependencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_ALL_INSTITUTIONS;
        const response = await axios.get(apiUrl);
        const dependenciasData = response.data.map(item => ({ label: item.institution }));
        setDependencias(dependenciasData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return dependencias;
};

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(2),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      primary: {
        main: '#d6d1C4',
        nofocus: '#cfcbc2',
        dark: '#c7bb9b',
      },
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#9e2f5f',
            '--TextField-brandBorderHoverColor': '#8c2b55',
            '--TextField-brandBorderFocusedColor': '#9e2f5f',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });