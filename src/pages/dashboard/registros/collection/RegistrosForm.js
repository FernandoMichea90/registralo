import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MobileDateTimePicker,MobileDatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../../components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const getInitialValues = (event, range) => {
  const initialEvent = {
    fecha:'',
    cantidad:''
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
  setOpenModal: PropTypes.func
};

export default function CalendarForm({ event,guardarRegistro,setOpenModal }) {
  const hasEventData = !!event;
  const EventSchema = Yup.object().shape({
    cantidad: Yup.string().max(255).required('Title is required'),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event),
  });

  const {
    // reset,
    // watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

// const values = watch();

  const onSubmit = async (data) => {
    try {

        var response = await guardarRegistro(data);
        // const newEvent = {
        // title: data.title,
        // description: data.description,
        // textColor: data.textColor,
        // allDay: data.allDay,
        // start: data.start,
        // end: data.end,
        // };

        // onCreateUpdateEvent(newEvent);

        // onCancel();

        // reset();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFecha = (newValue) => {
    alert(newValue);
    // buscar registros por fecha 
  // var response = await BuscarRegistrosPorFecha(newValue);

  }


//   const isDateError =
//     !values.allDay && values.start && values.end ? isBefore(new Date(values.end), new Date(values.start)) : false;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ px: 3 }}>

      <Controller
          name="fecha"
          control={control}
          render={({ field }) => (
            <MobileDatePicker
              {...field}
              onChange={(newValue) => {
                onChangeFecha(newValue);
                field.onChange(newValue)}}
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
            <IconButton onClick={onDeleteEvent}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={()=>setOpenModal(false)}>
          Cancelar
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {hasEventData ? 'Update' : 'Guardar test'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
