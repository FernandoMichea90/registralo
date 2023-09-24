import PropTypes from 'prop-types';
import React from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton, ThemeProvider as theme, Paper, Button,makeStyles } from '@mui/material';
// utils
import { fNumber, fShortenNumber } from '../../../utils/formatNumber';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import { grey } from '@mui/material/colors';
import { Emoji } from 'emoji-picker-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { ObtenerRegistrosCollectionToday,EditarRegistrosCollection } from 'src/functions/registros_db';
import { SpinnerCustom } from 'src/utils/spinner';
import { useCounter } from 'src/functions/Counter';
import { useAuthContext } from 'src/auth/useAuthContext';


const BotonMasMenos=styled(Button)(({theme})=>({
	  width: "45px", 
    height: "45px", 
    borderRadius: "50%",
    margin: "auto"
  
}))


RegistroCard.propTypes = {
  user: PropTypes.object,
};

export default function RegistroCard({ user, href }) {
  const {user:userContext} = useAuthContext();
  const { id, description, color, title,icono, follower = 5 } = user;
  // today total counts 
  // const [count, setCount] = React.useState(0);
  // today record  
  const [todayRecord,setTodayRecord]=React.useState({});
  // state cargando 
  const [cargando,setCargando]=React.useState(false);
  // usar la funcion useCounter 
  const [count, increment, decrement, setCount] = useCounter();
 

  // Guardar nueva cantidad en la collection de hoy 

const guardarCantidadCollection=async(count)=>{
try {
  console.log(userContext.profile)
  if(userContext){
  const response = await EditarRegistrosCollection(id,todayRecord.id,count,userContext.profile );
  console.log(response);
  setCargando(false);
}
} catch (error) {
  console.log(error);
}
}


// useEffect para count 
useEffect(() => {
setCargando(true);
try {
  const response =  guardarCantidadCollection(count);
  console.log(response);
} catch (error) {
  console.log(error);
  setCargando(false);
}

}, [count])


  useEffect(() => {
    const obtenerRegistroDeHoy=async()=>{
      try {
       const respuesta = await ObtenerRegistrosCollectionToday(new Date(),id);
       console.log(respuesta);
       setTodayRecord(respuesta);
       console.log(respuesta.cantidad);
       setCount(respuesta.cantidad);
       setCargando(false);
      } catch (error) {
        console.log(error);
        setCargando(false);
      }
    }
    setCargando(true);
    obtenerRegistroDeHoy();

  },[user]);

  return (
    <Paper elevation={10}>
      <Card sx={{ textAlign: 'center' }}>
        <Link href={href}>
          <Card style={{
            backgroundColor: color ? color : "#9e9e9e", margin: "auto",
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
            padding: '5px',
            cursor: 'pointer'
          }}>
            {
              icono &&
              <Avatar style={{ margin: 'auto', position: 'absolute', top: '12px' }}>
                <Emoji unified={icono} size={22} />
              </Avatar>
            }

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 2, color: grey[50] }}>
              {title}
            </Typography>

          </Card>
        </Link>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ p: 3 }}>
          <BotonMasMenos disabled={cargando?true:false} onClick={() => decrement()} >
            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                ➖
              </Typography>
            </div>
          </BotonMasMenos>
          {cargando?
          <SpinnerCustom/>
          :
          <Typography style={{margin:"auto"}} variant="subtitle1">{fNumber(count)}</Typography>
          }
          <BotonMasMenos disabled={cargando?true:false} onClick={() =>increment()}>
            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                ➕
              </Typography>
            </div>
          </BotonMasMenos>
        </Box>
      </Card>
    </Paper>
  );
}
