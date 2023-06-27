import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Card, Typography,Stack,Button } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { use } from 'i18next';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

AnalyticsWidgetSummary.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function AnalyticsWidgetSummary({loadingCount, title, total,increment,decrement,cambioHoy,setCambioHoy, icon, color = 'primary', sx,Loading, ...other }) {
  const theme = useTheme();

  // loadingCount= "decrement";
  // Loading=true;

  useEffect(() => {
    if (cambioHoy) {
      setCambioHoy(false);
    }
  }, [cambioHoy])

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Iconify
        icon={icon}
        sx={{
          mb: 3,
          p: 2.5,
          width: 64,
          height: 64,
          borderRadius: '50%',
          color: (theme) => theme.palette[color].dark,
          ...bgGradient({
            direction: '135deg',
            startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
            endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
          }),
        }}
      />

      <Typography variant="h3">{total>0 ? fShortenNumber(total): "0"}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        alignItems="flex-end"
        sx={{
          p: (theme) => theme.spacing(0, 1, 1, 1),
        }}
      >
         <LoadingButton
          fullWidth
          color="error"
          variant="contained"
          startIcon={<Iconify icon="octicon:dash-16" />}
          onClick={() => decrement()}
          loading={loadingCount ==='increment'? false:Loading}
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
        >
          
        </LoadingButton>
        <LoadingButton
          fullWidth
          color="success"
          variant="contained"
          startIcon={<Iconify icon="memory:plus" />}
          onClick={() => increment()}
          loading={loadingCount ==='decrement'? false:Loading}
          disabled={loadingCount ==='decrement'? true: false}
          sx={{
            '&.Mui-disabled': {
              backgroundColor: (theme) => theme.palette.success.main + '!important',
              color: loadingCount === 'increment' ? '' : '#ffffff',
              
            },
            '&.MuiLoadingButton-loadingIndicator': {
              color:'#ffffff !important',
            },
          }}
        >
          
        </LoadingButton>

       
      </Stack>
    </Card>
  );
}
