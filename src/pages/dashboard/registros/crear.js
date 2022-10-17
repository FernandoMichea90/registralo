
// next
import Head from 'next/head';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

RegistrosCrear.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function RegistrosCrear() {
    const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Calendar | Minimal UI</title>
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
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Event
            </Button>
          }
        />

        
      </Container>

      

     
    </>
  );
}

// ----------------------------------------------------------------------



