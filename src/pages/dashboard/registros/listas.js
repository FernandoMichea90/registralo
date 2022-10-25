// next
import Head from 'next/head';
// @mui
import { Container, Box, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userCards } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { UserCard } from '../../../sections/@dashboard/user/cards';
import { useEffect,useState } from 'react';
import { ObtenerRegistros } from 'src/functions/registros_db';
import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

UserCardsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  const { themeStretch } = useSettingsContext();
  const [listasRegistros, setListasRegistros] = useState([])

useEffect(() => {

const obtenerResponse=async()=>{
   var respuesta=await ObtenerRegistros();
   console.log(respuesta);
   setListasRegistros(respuesta);
}
obtenerResponse();

}, [])


  return (
    <>
      <Head>
        <title> Registros: Cards | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registros Cards"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Registros', href: PATH_DASHBOARD.registros },
            { name: 'Cards' },
          ]}
        />

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {listasRegistros.map((user) => (
            
            <Button component="a" href={PATH_DASHBOARD.registros.view(paramCase(user.title))} style={{display:'unset'}}>
            <UserCard key={user.id} user={user} />
            </Button>
          ))}
        </Box>
      </Container>
    </>
  );
}
