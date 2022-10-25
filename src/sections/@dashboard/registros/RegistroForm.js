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
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../components/hook-form';

// obtener  la funcion  

import { CrearRegistros } from 'src/functions/registros_db';
// ----------------------------------------------------------------------

const getInitialValues = (event, range) => {
  const initialEvent = {
    title: '',
    description: '',
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

export default function RegistroForm({ event, range, colorOptions, onCreateUpdateEvent, onDeleteEvent, onCancel, onCrear }) {
  const hasEventData = !!event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000).required('La descripcion es requerida'),
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
      const newEvent = {
        title: data.title,
        description: data.description,
        // textColor: data.textColor,
        // allDay: data.allDay,
        // start: data.start,
        // end: data.end,
      };

      // onCreateUpdateEvent(newEvent);
      await CrearRegistros(newEvent);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const Cancelar=()=>{
    reset();
  }

  const isDateError =
    !values.allDay && values.start && values.end ? isBefore(new Date(values.end), new Date(values.start)) : false;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={3} sx={{ px: 3 }}>
            <RHFTextField name="title" label="Title" />

            <RHFTextField name="description" label="Description" multiline rows={3} />


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
