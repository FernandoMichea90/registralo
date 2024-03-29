
// next
import PropTypes from 'prop-types';
import Head from 'next/head';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from '../../../redux/store';
import React, { useEffect, useState } from 'react';
// sections
import {
  RegistroForm,
} from '../../../sections/@dashboard/registros';

import { CrearRegistros } from '../../../functions/registros_db'
import {COLOR_OPTIONS as COLOR_OPTIONS_DEFAULT } from  "../../../data/colores"
import { useAuthContext } from 'src/auth/useAuthContext';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

RegistrosCrear.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

RegistrosCrear.propTypes = {
  registros: PropTypes.object,
  COLOR_OPTIONS: PropTypes.arrayOf(PropTypes.string),
};

export default function RegistrosCrear({registro, COLOR_OPTIONS}) {
  const { themeStretch } = useSettingsContext();
  const {user}=useAuthContext();
  //  colocar el state
  const [Estado, setEstado] = useState(false)
  // abrir ventana modal  
  const abrirVentanaModal = () => {
    setEstado(true)
  }

  const cerrarVentanaModal = () => {
    console.log('cerrar ventana modal')
    setEstado(false)
  }

  const funcionPrueba = (evento) => {
    alert('Estado')
    if(user){
    console.log(user)
    CrearRegistros(evento,user.profile);
    }
  }

  useEffect(() => {

  }, [])


  return (
    <>
      <Head>
        <title> Registro | Registros UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Registro"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Registros',
              href: PATH_DASHBOARD.registros.list,
            },
            {
              name: 'Crear Registro',
              href: PATH_DASHBOARD.registros.crear,
            }
            

          ]}
          //   moreLink={['https://fullcalendar.io/docs/react']}
          action={
            <>
              {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={abrirVentanaModal}>
                Crear Registros
              </Button> */}
            </>
          }
        />

       

          <RegistroForm
            onCrear={funcionPrueba}
            onCancel={cerrarVentanaModal}
            registro={registro}
            colorOptions={COLOR_OPTIONS?COLOR_OPTIONS:COLOR_OPTIONS_DEFAULT}
          />

          

       

        <Dialog fullWidth maxWidth="xs" open={Estado} onClose={cerrarVentanaModal}>
          <DialogTitle>Crear Registro</DialogTitle>
          <RegistroForm
            registro={registro}
            onCrear={funcionPrueba}
            onCancel={cerrarVentanaModal}
          />
        </Dialog>

      </Container>

    </>
  );
}

// ----------------------------------------------------------------------



