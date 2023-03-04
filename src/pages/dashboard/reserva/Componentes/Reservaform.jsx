import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel,TextField } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// assets
import { countries } from '../../../../assets/data';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { MobileDatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  children: PropTypes.node, // Agregar prop children
};

export default function UserNewEditForm({setFechaCheckin,setFechaCheckout,habitaciones,procedencia,tipohabitacion, children, isEdit = false, currentUser, setReserva, handleNext }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    checkin: Yup.date().required('Checkin is required'),
    checkout: Yup.date().required('Checkout is required'),
    noches: Yup.number().required('Noches is required'),
    precio_por_noche: Yup.number().required('Precio por noche is required'),
    precio_total: Yup.number().required('Precio total is required'),
    tipohabitacion: Yup.string().required('Tipo de habitacion is required'),
    habitacion: Yup.string().required('Habitacion is required'),
    motordereserva: Yup.string().required('Procedencia de reserva is required'),
  });

  const defaultValues = useMemo(
    () => ({

      checkin: currentUser?.checkin || new Date(),
      checkout: currentUser?.checkout || new Date(),
      noches: currentUser?.noches || 0,
      precio_por_noche: currentUser?.precio_por_noche || 0,
      precio_total: currentUser?.precio_total || 0,
      tipohabitacion: currentUser?.tipohabitacion || '',
      habitacion: currentUser?.habitacion || '',
      motordereserva: currentUser?.motordereserva || '',

    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) =>{
       setTimeout(resolve, 500)
     
      setReserva(values);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      handleNext();
    })
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile);
      }
    },
    [setValue]
  );

  return (
     <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              
              <Controller
                name="checkin"
                control={control}
                render={({ field }) => (
                  <MobileDatePicker
                    {...field}
                    onChange={(newValue) =>{ 
                    
                    setFechaCheckin(newValue)
                    field.onChange(newValue)}}
                    label="Fecha"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />
               <Controller
                name="checkout"
                control={control}
                render={({ field }) => (
                  <MobileDatePicker
                    {...field}
                    onChange={(newValue) => {
                      setFechaCheckout(newValue)
                      field.onChange(newValue)}}
                    label="Fecha"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />
              <RHFSelect name="tipohabitacion" label="Tipo de Habitacion" placeholder="Country">
                <option value="" />
                  {tipohabitacion.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.tipo_habitacion}
                    </option>
                ))}
              </RHFSelect>

              <RHFSelect name="habitacion" label="Habitacion" placeholder="Country">
                <option value="" />
                {habitaciones.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id + '-' + option.nombre}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="motordereserva" label="Procedencia" placeholder="Country">
                <option value="" />
                {procedencia.map((option) => (
                  <option key={option.id} value={option.nombre}>
                    {option.nombre}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="precio_por_noche" label="precio por noche" />
              <RHFTextField name="noches" label="noches" />
              <RHFTextField name="precio_total" label="Precio Total" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {children}
      </>
   
  );
}
