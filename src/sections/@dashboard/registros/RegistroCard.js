import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton, ThemeProvider as theme, Paper } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import { grey } from '@mui/material/colors';
import { Emoji } from 'emoji-picker-react';


// ----------------------------------------------------------------------




// ----------------------------------------------------------------------

RegistroCard.propTypes = {
  user: PropTypes.object,
};

export default function RegistroCard({ user }) {
  const { title,icono,color, cover, role, follower, totalPosts, avatarUrl, following } = user;

  return (
    <Paper elevation={10}>
    <Card sx={{ textAlign: 'center'}}>
      <Card  style={{backgroundColor:color?color:"#9e9e9e",margin:"auto",
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      padding:'5px',
    }}>
      {
       icono &&
        <Avatar style={{margin:'auto',position:'absolute',top:'12px'}}>
          <Emoji unified={icono}   size={22} />
       </Avatar>
      }
      
      <Typography  variant="subtitle1" sx={{ mt: 2, mb: 2,color:grey[50] }}>
        {title}
      </Typography>

      </Card>
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            ➖
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75 }}>
            3
          </Typography>

          <Typography variant="subtitle1">{fShortenNumber(following)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            ➕
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(totalPosts)}</Typography>
        </div>
      </Box>
    </Card>
    </Paper>
  );
}
