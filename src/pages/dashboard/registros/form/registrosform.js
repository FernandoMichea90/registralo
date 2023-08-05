import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../../components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../../components/hook-form';

// obtener  la funcion  

import { CrearRegistros, CrearRegistrosCollection } from '../../../../functions/registros_db';
// ----------------------------------------------------------------------

const getInitialValues = (event, range) => {
    const initialEvent = {
        cantidad: 0,
        comentario: '',
        textColor: '#1890FF',
        allDay: false,
        start: range ? new Date(range.start).toISOString() : new Date().toISOString(),
        end: range ? new Date(range.end).toISOString() : new Date().toISOString(),
    };

    if (event || range) {
        return merge({}, initialEvent, event);
    }

    return initialEvent;
};

// ----------------------------------------------------------------------

RegistroForm.propTypes = {
    event: PropTypes.object,
    range: PropTypes.object,
    onCancel: PropTypes.func,
    onDeleteEvent: PropTypes.func,
    onCreateUpdateEvent: PropTypes.func,
    colorOptions: PropTypes.arrayOf(PropTypes.string),
};

export default function RegistroForm({ event, range, colorOptions, onCreateUpdateEvent, onDeleteEvent, onCancel, onCrear,registroId }) {
    const hasEventData = !!event;

    const EventSchema = Yup.object().shape({
        cantidad: Yup.number().required('Cantidad es requerida'),
        comentario: Yup.string().max(5000).required('La descripcion es requerida'),
    });

    const methods = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: getInitialValues(event, range),
    });

    const {
        reset,
        watch,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {
        try {
            console.log(registroId);
            console.log(data);
            // fecha como string 
            console.log(Date.parse(data.start));
            var fechaUnix= Date.parse(data.start);
            var fechaDate= new Date(fechaUnix);
            console.log(fechaDate);
            var  ano= fechaDate.getFullYear();
            var  mes= fechaDate.getMonth();
            var  dia= fechaDate.getDay();
            var fecha_codigo= dia+'/'+mes+'/'+ano;
            const newEvent = {
                fecha: fechaDate,
                cantidad: data.cantidad,
                comentario: data.comentario,
                ano: ano,
                mes: mes,
                dia: dia,
                fecha_codigo: fecha_codigo                   
            };
            // onCreateUpdateEvent(newEvent);

            const response = await CrearRegistrosCollection(registroId,newEvent);
            console.log(response);
            onCancel();
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const Cancelar = () => {
        onCancel();
        reset();
    }

    const isDateError =
        !values.allDay && values.start && values.end ? isBefore(new Date(values.end), new Date(values.start)) : false;

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={3} sx={{ px: 3 }}>

                        <Controller
                            name="createDate"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                    label="Date create"
                                    value={field.value}
                                    onChange={(newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                                    )}
                                />
                            )}
                        />

                        <RHFTextField name="cantidad" label="Cantidad" />

                        <RHFTextField name="comentario" label="Comentario" multiline rows={3} />


                    </Stack>

                    <DialogActions>
                        {hasEventData && (
                            <Tooltip title="Delete Event">
                                <IconButton onClick={onDeleteEvent}>
                                    <Iconify icon="eva:trash-2-outline" />
                                </IconButton>
                            </Tooltip>
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Button variant="outlined" color="inherit" onClick={Cancelar}>
                            Cancelar
                        </Button>

                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Guardar
                        </LoadingButton>
                    </DialogActions>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
