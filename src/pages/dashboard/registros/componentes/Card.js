import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Button, Box } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { use } from 'i18next';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Emoji } from 'emoji-picker-react';
// ----------------------------------------------------------------------
IconWidget.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.object,
  total: PropTypes.number,
};

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

export default function IconWidget({ loadingCount, title, total, increment, decrement, cambioHoy, setCambioHoy, icon, color = 'primary', sx, Loading, ...other }) {
  const theme = useTheme();
  // loadingCount= "decrement";
  // Loading=true;
  useEffect(() => {
    if (cambioHoy) {
      setCambioHoy(false);
    }
  }, [cambioHoy])

  return (
    <div style={{position:"relative",height:"100%"}}> 
      <DivPunto color={title.color} />
      <Card
        sx={{
          boxShadow: 0,
          height: '100%',
          textAlign: 'center',  
          bgcolor: "#f5f5f5",
          ...sx,
        }}
        {...other}
      >
        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "space-between", height: "100%" }}>
          <div
            style={{
              margin: 'auto',
              padding: "16px",
              width: 64,
              height: 64,
              borderRadius: '50%',
              color: title.color,
              background: "linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, #d7d7d7 100%)",
            }}
          >
            <Emoji
              unified={title.icono}
            />
          </div>

          <Typography variant="h3" >{total > 0 ? fShortenNumber(total) : "0"}</Typography>

          <Typography variant="subtitle2" style={{ margin: "10px 0px" }} sx={{ opacity: 0.64 }}>
            {title.title}
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-end"
            sx={{
              p: (theme) => theme.spacing(0, 1, 1, 1),
              marginBottom: (theme) => theme.spacing(3),
            }}
          >
            <LoadingButton
              fullWidth
              color="error"
              variant="contained"
              startIcon={<Iconify icon="octicon:dash-16" />}
              onClick={() => decrement()}
              loading={loadingCount === 'increment' ? false : Loading}
              disabled={loadingCount === 'increment' || total === 0}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: (theme) => theme.palette.error.main + '!important',
                  color: loadingCount === 'decrement' ? '' : '#ffffff',

                },
                '& .MuiLoadingButton-loadingIndicator': {
                  color: '#ffffff !important',
                },
              }}
            />

            <LoadingButton
              fullWidth
              style={{ backgroundColor: title.color }}
              variant="contained"
              startIcon={<Iconify icon="memory:plus" />}
              onClick={() => increment()}
              loading={loadingCount === 'decrement' ? false : Loading}
              disabled={loadingCount === 'decrement' ? true : false}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: (theme) => theme.palette.success.main,
                  color: loadingCount === 'increment' ? '' : '#ffffff',

                },
                '&.MuiLoadingButton-loadingIndicator': {
                  color: '#ffffff !important',
                  backgroundColor: title.color,
                },
              }}
            />




          </Stack>
        </Box>
      </Card>
    </div>
  );
}
