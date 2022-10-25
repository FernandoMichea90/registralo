
// next
import Head from 'next/head';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from '../../../redux/store';
import { useEffect, useState } from 'react';
// sections
import {
  RegistroForm,
} from '../../../sections/@dashboard/registros';

import { CrearRegistros } from '../../../functions/registros_db'
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

RegistrosCrear.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function RegistrosCrear() {
  const { themeStretch } = useSettingsContext();
  //  colocar el state
  const [Estado, setEstado] = useState(false)
  // abrir ventana modal  
  const abrirVentanaModal = () => {
    setEstado(true)
  }

  const cerrarVentanaModal = () => {
    setEstado(false)
  }

  const funcionPrueba = (evento) => {
    CrearRegistros(evento);
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
          heading="Registros"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Registros',
            },
          ]}
          //   moreLink={['https://fullcalendar.io/docs/react']}
          action={
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={abrirVentanaModal}>
              Crear Registros
            </Button>
          }
        />

        <Card sx={{ p: 3 }}>

          <RegistroForm
            onCrear={funcionPrueba}
            onCancel={cerrarVentanaModal}
          >

          </RegistroForm>

        </Card>

        <Dialog fullWidth maxWidth="xs" open={Estado} onClose={cerrarVentanaModal}>
          <DialogTitle>Crear Registro</DialogTitle>
          <RegistroForm
            onCrear={funcionPrueba}
            onCancel={cerrarVentanaModal}
          >

          </RegistroForm>
        </Dialog>

      </Container>

    </>
  );
}

// ----------------------------------------------------------------------



