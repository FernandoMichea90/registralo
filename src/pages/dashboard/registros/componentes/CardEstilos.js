import { styled } from '@mui/material/styles';


export const DivPunto= styled('div')(({ theme,color }) => ({
    width: 20,
    height: 20,
    backgroundColor: color  , /* Cambia el color a rojo o verde según sea necesario */
    borderRadius: '50%',
    position: "absolute",
    top: 35,
    right: -8,
    zIndex: 1,
  }));
