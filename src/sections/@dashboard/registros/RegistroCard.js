import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

RegistroCard.propTypes = {
  user: PropTypes.object,
};

export default function RegistroCard({ user }) {
  const { title, cover, role, follower, totalPosts, avatarUrl, following } = user;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative',height:'60px' }}>
        {/* <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: 0,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        /> */}

        {/* <Avatar
          alt={title}
          src={avatarUrl}
        /> */}

        <StyledOverlay />

        {/* <Image src={cover} alt={cover} ratio="16/9" /> */}
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 0.5 }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {role}
      </Typography>

      {/* <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1, mb: 3 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.title}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}

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
  );
}
