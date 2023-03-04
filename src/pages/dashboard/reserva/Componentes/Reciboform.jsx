import React from 'react'
import {Grid,Card,Box,Typography,Stack} from '@mui/material'
import TextfieldPersonalizado from './TexfieldPersonalizado'
import { LoadingButton } from '@mui/lab';


const Reciboform = ({reserva,cliente}) => {
  // crear una funcion para formatear la fecha
  // al formato dd/mm/yyyy
  const formaterarFecha = (fecha) => {
    const fechaFormateada = new Date(fecha)
    const dia = fechaFormateada.getDate()
    const mes = fechaFormateada.getMonth()
    const anio = fechaFormateada.getFullYear()
    return `${dia}/${mes}/${anio}`
  }
  return (
    <>
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
               
               <TextfieldPersonalizado nombre="Nombre" value={cliente.name}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Correo" value={cliente.email}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Celular" value={cliente.phoneNumber}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Pais" value={cliente.pais}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Rut o Pasaporte" value={cliente.rut_pasaporte}></TextfieldPersonalizado>

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
               <TextfieldPersonalizado nombre="Check in" value={formaterarFecha(reserva.checkin)}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Check out" value={formaterarFecha(reserva.checkout)}></TextfieldPersonalizado>
              <TextfieldPersonalizado nombre="Tipo Habitacion" value={reserva.tipohabitacion}></TextfieldPersonalizado>
              <TextfieldPersonalizado nombre="Habitacion" value={reserva.habitacion}></TextfieldPersonalizado>
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
               <TextfieldPersonalizado nombre="Procedencia" value={reserva.motordereserva}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Precio por noche" value={reserva.precio_por_noche}></TextfieldPersonalizado>
               <TextfieldPersonalizado nombre="Noches" value={reserva.noches}></TextfieldPersonalizado>
               <div/>
               <div/>
               <Typography variant="h6">Total ${reserva.precio_total}</Typography>


            </Box>
            </Card>
         </Grid>
    </Grid>
    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
    <LoadingButton type="submit" variant="contained" >
       Guardar
    </LoadingButton>
  </Stack>
  </>
  )
}

export default Reciboform