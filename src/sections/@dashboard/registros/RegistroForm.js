import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { isBefore } from 'date-fns';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, IconButton, DialogActions, Grid, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../components/hook-form';

// obtener  la funcion  

import { CrearRegistros, EditarRegistros } from 'src/functions/registros_db';
import { ColorSinglePicker } from 'src/components/color-utils';
import RegistroIcono from './RegistroIcono';
// ----------------------------------------------------------------------

const getInitialValues = (registro) => {
  const initialEvent = {
    title: registro?.title || '',
    description: registro?.description || '',
    color: registro?.color || '',
    icono: registro?.icono || '',
  };

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
  registro: PropTypes.object
};

export default function RegistroForm({ event, range, colorOptions, onCreateUpdateEvent, onDeleteEvent, onCancel, onCrear, registro }) {
  const hasEventData = !!event;
  // Color Options
  // const [colorOptions, setColorOptions] = useState([]);
  // Icono Options
  const [iconoOptions, setIconoOptions] = useState([]);
  const [iconoStr, setIconoStr] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000).required('La descripcion es requerida'),
    color: Yup.string().max(255).required('Text color is required'),
    icono: Yup.string().max(255).required('Icono is required'),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(registro),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting,errors },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        color: data.color,
        icono: data.icono,
        
      };

      // onCreateUpdateEvent(newEvent);
      registro ? await EditarRegistros(registro.id, newEvent) :await CrearRegistros(newEvent);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const Cancelar = () => {
    reset();
  }

  const onEmojiClick = (emojiObject, event) => {
    console.log(emojiObject);
    setSelectedEmoji(emojiObject.unified);
    setIconoStr((prevInput) => prevInput + emojiObject.emoji);
    setValue('icono', emojiObject.unified);
    setShowPicker(false);
  };

  const onClickIcono = () => {
    setShowPicker(true);
  }


  const isDateError = !values.allDay && values.start && values.end ? isBefore(new Date(values.end), new Date(values.start)) : false;

  // useEffect con el registro
  useEffect(() => {
    if (registro) {
      setValue('title', registro.title);
      setValue('description', registro.description);
      setValue('color', registro.color);
      setValue('icono', registro.icono);
      registro.icono && setSelectedEmoji(registro.icono);
    }
  }, [registro]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ px: 3 }}>
              {/* SPAN DE COLORES */}
              <span> Seleccione Color </span>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <ColorSinglePicker value={field.value} onChange={field.onChange} colors={colorOptions}  >

                  </ColorSinglePicker>
                )}
              ></Controller>
              {errors.color && <p>This is required.</p>}
              {/* <Controller 
              name="icono"
              control={control}
              render={({ field }) => ( */}
              <RegistroIcono  selectedEmoji={selectedEmoji}  onClickIcono={onClickIcono} onEmojiClick={onEmojiClick} showPicker={showPicker} />
              {/* )}
              ></Controller> */}
             {errors.icono && <p>This is required.</p>}

              
            </Stack>
          </Card>
        </Grid>
        {/* Layout Descripcion */}
        <Grid item xs={7}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ px: 3 }}>
              <RHFTextField name="title" label="Nombre" />

              <RHFTextField name="description" label="Descripcion" multiline rows={3} />


            </Stack>

            <DialogActions>
              {hasEventData && (
                <Tooltip title="Delete Event">
                  <IconButton onClick={onDeleteEvent}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              )}

              <Box sx={{ flexGrow: 1 }} >
              <RHFSwitch name="continuar" label="Seguir Creando" />
              </Box>
              <Button variant="outlined" color="inherit" onClick={Cancelar}>
                Cancelar
              </Button>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {registro ? 'Editar' : 'Crear'}
              </LoadingButton>
            </DialogActions>
          </Card>
        </Grid>
        {/* Fin Layout Descripcion */}

      </Grid>
    </FormProvider>
  );
}
