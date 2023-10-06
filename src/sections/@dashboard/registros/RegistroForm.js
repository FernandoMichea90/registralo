import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Button, Tooltip, IconButton, DialogActions, Grid, Card, Switch } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import FormProvider, { RHFTextField, RHFSwitch } from '../../../components/hook-form';
import { CrearRegistros, EditarRegistros,BorrarRegistros } from '../../../functions/registros_db';
import { ColorSinglePicker } from '../../../components/color-utils';
import RegistroIcono from './RegistroIcono';
import { useAuthContext } from 'src/auth/useAuthContext';
// import Router de next 
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';

const getInitialValues = (registro) => ({
  title: registro?.title || '',
  description: registro?.description || '',
  color: registro?.color || '',
  icono: registro?.icono || '',
});


RegistroForm.propTypes = {
  onCancel: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  registro: PropTypes.object,
};

export default function RegistroForm({ onCancel, onDeleteEvent, colorOptions, registro }) {
  const hasEventData = !!registro;
  // pedir datos dell usuario
  const { user } = useAuthContext();
  //state de "seguir creando" 
  const [seguirCreando, setSeguirCreando] = useState(false)
  // abrir el modal borrar 
  const [openModal, setOpenModal] = useState(false);
  // inicializar router. Obtener push 
  const {push} = useRouter();
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
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;


  const onSubmit = async (data) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        color: data.color,
        icono: data.icono,
        user: user.profile,
      };
      if (registro) {
        await EditarRegistros(registro.id, newEvent);
      } else {
        await CrearRegistros(newEvent);
      }
      Cancelar();
      if (!seguirCreando) {
        push(PATH_DASHBOARD.registros.list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Cancelar = () => {
    reset();
    setSelectedEmoji(null);
  };

  const onEmojiClick = (emojiObject, event) => {
    event.preventDefault();
    setSelectedEmoji(emojiObject.unified);
    setValue('icono', emojiObject.unified);
    setShowPicker(false);
  };

  const onClickIcono = () => {
    setShowPicker(true);
  };

  // cambiar seguir creando 
  const handleSeguirCreando = (event) => {
    setSeguirCreando(event.target.checked);
  }
 // Borrar Registor 
 const borrarRegistro=() =>{
   // abrir un modal  de mui 
 }
  useEffect(() => {
    if (registro) {
      setValue('title', registro.title);
      setValue('description', registro.description);
      setValue('color', registro.color);
      setValue('icono', registro.icono);
      registro.icono && setSelectedEmoji(registro.icono);
    }
  }, [registro, setValue]);

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ px: 3 }}>
              <RHFTextField name="title" label="Nombre" />
              <RHFTextField name="description" label="Descripcion" multiline rows={3} />
            </Stack>
            <DialogActions>
              {!hasEventData &&
                <>
                  <Box sx={{ flexGrow: 1 }}>
                    <Switch
                      checked={seguirCreando}
                      onChange={handleSeguirCreando}

                    ></Switch>
                    <span>Seguir Creando</span>
                  </Box>
                  <Button variant="outlined" color="inherit" onClick={Cancelar}>
                    Cancelar
                  </Button>
                </>
              }
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {registro ? 'Editar' : 'Crear'}
              </LoadingButton>
            </DialogActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ px: 3 }}>
              <span>Seleccione Color</span>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <ColorSinglePicker value={field.value} onChange={field.onChange} colors={colorOptions} />
                )}
              />
              {errors.color && <p>This is required.</p>}
              <RegistroIcono selectedEmoji={selectedEmoji} onClickIcono={onClickIcono} onEmojiClick={onEmojiClick} showPicker={showPicker} />
              {errors.icono && <p>This is required.</p>}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
