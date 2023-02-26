import React from 'react'
import {Grid,Card,Box,Typography} from '@mui/material'
import TextfieldPersonalizado from './TexfieldPersonalizado'

const Reciboform = () => {
  return (
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
               
               <TextfieldPersonalizado nombre="Nombre" value="Fernando Michea"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Correo" value="fmicheam@gmail.com"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Celular" value="976226068"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Pais" value="Peru"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Rut o Pasaporte" value="12345678"></TextfieldPersonalizado>

                {/* cambio de fila */}
                
            </Box>
            </Card>
         </Grid>
         <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >  
               <TextfieldPersonalizado nombre="Check in" value="22/02"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Check out" value="25/02"></TextfieldPersonalizado>
              <TextfieldPersonalizado nombre="Tipo Habitacion" value="Superior"></TextfieldPersonalizado>
              <TextfieldPersonalizado nombre="Habitacion" value="34 - Elvis Presley"></TextfieldPersonalizado>
            </Box>
            </Card>
         </Grid>
         <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >  
               <TextfieldPersonalizado nombre="Procedencia" value="Booking"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Precio por noche" value="$54.000"></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Noches" value="3"></TextfieldPersonalizado>
               <div/>
               <div/>
               <Typography variant="h6">Total $162.000</Typography>


            </Box>
            </Card>
         </Grid>
    </Grid>
  )
}

export default Reciboform