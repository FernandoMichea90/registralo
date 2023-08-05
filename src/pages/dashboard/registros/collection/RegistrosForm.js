import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { CircularProgress } from '@mui/material';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker, MobileDatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../../components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../../components/hook-form';
import { get } from 'lodash';
import { use } from 'i18next';
import { ObtenerRegistrosCollectionId } from '../../../../functions/registros_db';

// ----------------------------------------------------------------------

const getInitialValues = (event, range) => {
  const initialEvent = {
    fecha: '',
    cantidad: ''
  };

  if (event || range) {
    return merge({}, initialEvent, event);
  }

  return initialEvent;
};

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
  //   range: PropTypes.object,
  //   onCancel: PropTypes.func,
  //   onDeleteEvent: PropTypes.func,
  //   onCreateUpdateEvent: PropTypes.func,
  //   colorOptions: PropTypes.arrayOf(PropTypes.string),
  guardarRegistro: PropTypes.func,
  setOpenModal: PropTypes.func,
  editando: PropTypes.bool,
};

export default function CalendarForm({ event, guardarRegistro, setOpenModal, editando, title, setCambioHoy, setCount }) {
  const hasEventData = !!event;
  const EventSchema = Yup.object().shape({
    cantidad: Yup.string().max(255).required('Title is required'),
  });
  // State Cargando 
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event),
  });


  const {
    // reset,
    // watch,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // comparar si la data.fecha es igual a la fecha de hoy        
      var response = await guardarRegistro(data);
      if (data.fecha.toDateString() === new Date().toDateString()) {
        if (response) {
          setCount(data.cantidad);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  // const onChangeFecha = (newValue) => {
  //   alert(newValue);
  //   // buscar registros por fecha 
  // // var response = await BuscarRegistrosPorFecha(newValue);

  // }


  //   const isDateError =
  //     !values.allDay && values.start && values.end ? isBefore(new Date(values.end), new Date(values.start)) : false;

  const getFechaString = (day, month, year) => {
    var fecha = month + "/" + day + "/" + year;
    var date = new Date(fecha);
    return date;
  }


  useEffect(() => {
    const buscarPorId = async (title, id) => {
      var response = await ObtenerRegistrosCollectionId(title, id);
      var data = {
        fecha: getFechaString(response.day, response.month, response.year),
        cantidad: response.cantidad
      }
      setValue('fecha', data.fecha);
      setValue('cantidad', data.cantidad ? data.cantidad : '0');
      // Set Cargando False
      setLoading(false)
    }
    if (editando) {
      // Set Cargando True 
      setLoading(true);
      // buscar registro por id
      buscarPorId(title, editando);
    }
  }, [editando]);



  return (
    <>
      {loading ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin:'100px' }}>
          <CircularProgress />
        </div>
        :
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ px: 3 }}>

            <Controller
              name="fecha"
              control={control}
              render={({ field }) => (
                <MobileDatePicker
                  {...field}
                  onChange={(newValue) => {
                    field.onChange(newValue)
                  }}
                  label="Fecha"
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            />
            <RHFTextField name="cantidad" label="Cantidad" />
          </Stack>
          <DialogActions>
            {hasEventData && (
              <Tooltip title="Delete Event">
                <IconButton >
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Button variant="outlined" color="inherit" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {editando ? 'Update' : 'Guardar'}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      }
    </>
  );
}
