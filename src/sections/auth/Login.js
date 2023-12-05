// next
import NextLink from 'next/link';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Iniciar sesion</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">'¿Deseas crear una cuenta?</Typography>

          <a style={{textDecoration:"none"}} href={PATH_AUTH.register} >
            <Link variant="subtitle2">Crear cuenta</Link>
          </a>
        </Stack>

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
             src={`${process.env.REACT_APP_BASE_PATH}/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Usar Email : <strong>demo@registralo.cl</strong> / Contraseña :<strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
