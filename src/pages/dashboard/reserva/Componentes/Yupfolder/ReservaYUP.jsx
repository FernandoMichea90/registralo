import * as Yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';

export  const ReservaYupTest=()=> {

    const currentUser = {name:""};

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
    
      const methodsReserva = useForm({
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
      } = methodsReserva;
    
      const valuesReserva = watch();

  return {
    methodsReserva,
    valuesReserva,
  };

}


