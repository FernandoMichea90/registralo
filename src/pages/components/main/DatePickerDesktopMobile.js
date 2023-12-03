import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Box, Button, TextField } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';

const DatePickerDesktopMobile = ({ fecha, setFecha }) => {
    const isDesktop = useResponsive("up", "md");
    const [value, setValue] = useState(fecha || new Date());

    const hoy = () => {
        const newDate = new Date();
        setValue(newDate);
        if(setFecha) setFecha(newDate); // Actualizar el estado externo si setFecha está disponible
    }

    return (
        <div style={{ width: '100%', margin: "5px", marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isDesktop ? (
                    <DesktopDatePicker
                        label="Fecha"
                        value={value}
                        minDate={new Date('2017-01-01')}
                        onChange={(newValue) => {
                            setValue(newValue);
                            if(setFecha) setFecha(newValue); // Actualizar el estado externo si setFecha está disponible
                        }}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} margin="normal" />}
                    />
                ) : (
                    <MobileDatePicker
                        orientation="portrait"
                        label="Fecha"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            if(setFecha) setFecha(newValue); // Actualizar el estado externo si setFecha está disponible
                        }}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} margin="normal" />}
                    />
                )}
                <Button sx={{ margin: '20px' }} variant="contained" onClick={hoy}>
                    Hoy
                </Button>
            </Box>
        </div>
    );
}

DatePickerDesktopMobile.propTypes = {
    fecha: PropTypes.instanceOf(Date),
    setFecha: PropTypes.func // setFecha debe ser una función
}

export default DatePickerDesktopMobile;
