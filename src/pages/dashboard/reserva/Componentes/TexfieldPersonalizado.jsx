import React from 'react'
import { TextField } from '@mui/material'

const TexfieldPersonalizado = ({nombre,value}) => {
  return (
    <TextField id="outlined-basic" fullWidth label={nombre} variant="outlined" value={value} />
  )
}

export default TexfieldPersonalizado