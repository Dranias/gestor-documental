import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    TextField,
    Switch,
    FormControlLabel,
    Box,
    Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";

const ModalAudiences = ({ open, onClose, onSubmit, initialData }) => {
    const [newAudience, setNewAudience] = useState({
        date: new Date(),
        name: "",
        position: "",
        description: "",
        priority: false,
    });

    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        if (initialData) {
            setNewAudience({
                ...initialData,
                date: new Date(initialData.date),
            });
            setSelectedDate(dayjs(initialData.date)); 
        } else {
            const now = new Date();
            setNewAudience({
                date: now,
                name: "",
                position: "",
                description: "",
                priority: false,
            });
            setSelectedDate(dayjs(now));
        }
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAudience((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (e) => {
        setNewAudience((prev) => ({ ...prev, priority: e.target.checked }));
    };

    const handleSubmit = () => {
        const audienceWithFormattedDate = {
            ...newAudience,
            date: selectedDate.toDate(), // Convertir de dayjs a Date para el backend
        };
        onSubmit(audienceWithFormattedDate);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {/* DatePicker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Fecha"
                            value={selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue);
                            }}
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <Box sx={{ mb: 2 }} />

                {/* Nombre */}
                <TextField
                    label="Nombre"
                    name="name"
                    value={newAudience.name}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                {/* Cargo */}
                <TextField
                    label="Cargo"
                    name="position"
                    value={newAudience.position}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                {/* Descripción */}
                <TextField
                    label="Descripción"
                    name="description"
                    value={newAudience.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                {/* Prioritaria */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body1">Prioritaria:</Typography>
                </Box>

                <FormControlLabel
                    control={<Switch checked={newAudience.priority} onChange={handleSwitchChange} />}
                    label={newAudience.priority ? "Sí" : "No"}
                    sx={{ mb: 2 }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSubmit} color="primary">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalAudiences;
