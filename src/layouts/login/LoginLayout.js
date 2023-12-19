import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Grid } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import { HomeCardMobile, HomeHero } from 'src/sections/home';
import RegistroDemo from 'src/components/registro/RegistroDemo';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <div id='prueba' style={{height:"100vh",width:"100vw"}}>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      >
      </Logo>
      
      <Grid container>

        <Grid item xs={12} md={7}>
          <div style={{}}>
          {/* <Typography variant="h3" sx={{ mt: 10, maxWidth: 480, textAlign: 'center' }}>
            {title || 'Hola, Bienvenido a registralo'}
        </Typography> */}
        <RegistroDemo/>
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack sx={{ width: 0.7, margin:"20% 20px"}}> {children} </Stack>
        </Grid>

      </Grid>
    </div>
  );

}
