import * as Yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';

export  const PasajeroYupTest=()=> {

    const currentUser = {name:""};

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name es requerido'),
        // email: Yup.string().required('Email es requerido').email(),
        // phoneNumber: Yup.string().required('Phone number is required'),
        // address: Yup.string().required('Address is required'),
        pais: Yup.string().required('Pais es requerido'),
        rut_pasaporte:Yup.string().required('Rut o Pasaporte  es requerido')
     
      });
    
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
       email: currentUser?.email || '',
      // phoneNumber: currentUser?.phoneNumber || '',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
     
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

   const methodsPasajero = useForm({
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
  } = methodsPasajero;

  const valuesPasajero = watch();

  return {
    methodsPasajero,
    valuesPasajero,
  };

}


