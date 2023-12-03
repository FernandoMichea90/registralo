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
import { ObtenerRegistros } from '../../../functions/registros_db';
import { paramCase } from 'change-case';
import RegistroCard from '../../../sections/@dashboard/registros/RegistroCard';
import Link from 'next/link';
import { useAuthContext } from 'src/auth/useAuthContext';
import PickerDate from 'src/sections/_examples/mui/pickers/PickerDate';
import DatePickerDesktopMobile from 'src/pages/components/main/DatePickerDesktopMobile';

// ----------------------------------------------------------------------

UserCardsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  const { themeStretch } = useSettingsContext();
  const [fecha,setFecha]=useState(new Date());
  // obtener el usuario 
  const {user} =useAuthContext();
  const [listasRegistros, setListasRegistros] = useState([])

useEffect(() => {

const obtenerResponse=async()=>{
  if(user){
   var respuesta=await ObtenerRegistros(user.profile);
   setListasRegistros(respuesta);
  }
}
obtenerResponse();

}, [user])


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
        <DatePickerDesktopMobile fecha={fecha} setFecha={setFecha}></DatePickerDesktopMobile>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {listasRegistros.map((user,key) => (
            <RegistroCard  key={user.id} user={user} fecha={fecha} href={PATH_DASHBOARD.registros.view(user.id,user.title)} />
          ))}
        </Box>
      </Container>
    </>
  );
}
