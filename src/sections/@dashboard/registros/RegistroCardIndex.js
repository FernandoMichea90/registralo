import React from 'react'
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton, ThemeProvider as theme, Paper, Button,makeStyles } from '@mui/material';
import { Emoji } from 'emoji-picker-react';
import { grey } from '@mui/material/colors';
import {styled } from '@mui/material/styles';
import { fNumber } from 'src/utils/formatNumber';




const BotonMasMenos=styled(Button)(({theme})=>({
  width: "45px", 
  height: "45px", 
  borderRadius: "50%",
  margin: "auto"

}))


// colors options 



const RegistroCardIndex = ({title="prueba",icono={nombre:"diente",icono:"1f9b7"},color="#9e9e9e",cargando=false}) => {
 const [count,setCount] =React.useState(0);
  // Función para incrementar el contador
const increment = () => {
  setCount((prevCount) => prevCount + 1);
};

// Función para decrementar el contador si el valor actual es mayor que 0
const decrement = () => {
  if (count > 0) {
    setCount((prevCount) => prevCount - 1);
  }
};

  return (

    <Paper elevation={10} >
    <Card sx={{ textAlign: 'center',margin:"auto",zIndex:1 }}>
   
        <Card style={{
          backgroundColor: color ? color : "#9e9e9e", margin: "auto",
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          padding: '5px',
          cursor: 'pointer'
        }}>
          {
            icono &&
            <>
              <div
                style={{
                  margin: 'auto',
                  width: '90px',
                  height: '90px',
                  position: 'absolute',
                  top: '-8px',
                  left: '-20px',
                  background:'#ffffff',
                  borderRadius: '50%',
                }}
              ></div>
              <Avatar style={{ margin: 'auto', position: 'absolute', top: '12px',left:"5px"}}>
                <Emoji unified={icono.icono} size={25} />
              </Avatar>
            </>
          }

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 2, color: grey[50] }}>
            {icono.nombre}
          </Typography>

        </Card>
      
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ p: 3 }}>
        <BotonMasMenos disabled={cargando?true:false} onClick={() => decrement()} >
          <div>
            <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
              ➖
            </Typography>
          </div>
        </BotonMasMenos>
       
        <Typography style={{margin:"auto"}} variant="subtitle1">{fNumber(count)}</Typography>
        
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
  )
}

export default RegistroCardIndex