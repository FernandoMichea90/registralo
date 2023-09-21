import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton, ThemeProvider as theme, Paper, Button,makeStyles } from '@mui/material';
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
import Link from 'next/link';


const BotonMasMenos=styled(Button)(({theme})=>({
	  width: "45px", 
    height: "45px", 
    borderRadius: "50%",
    margin: "auto"
  
}))


RegistroCard.propTypes = {
  user: PropTypes.object,
};

export default function RegistroCard({ user, href }) {
  const { title, icono, color, cover, role, follower, totalPosts, avatarUrl, following = 5 } = user;
  return (
    <Paper elevation={10}>
      <Card sx={{ textAlign: 'center' }}>
        <Link href={href}>
          <Card style={{
            backgroundColor: color ? color : "#9e9e9e", margin: "auto",
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
            padding: '5px',
            cursor: 'pointer'
          }}>
            {
              icono &&
              <Avatar style={{ margin: 'auto', position: 'absolute', top: '12px' }}>
                <Emoji unified={icono} size={22} />
              </Avatar>
            }

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 2, color: grey[50] }}>
              {title}
            </Typography>

          </Card>
        </Link>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ p: 3 }}>
          <BotonMasMenos onClick={() => alert("Menos")} >
            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                ➖
              </Typography>
              <Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
            </div>
          </BotonMasMenos>
          <Typography style={{margin:"auto"}} variant="subtitle1">{fShortenNumber(6)}</Typography>
          <BotonMasMenos onClick={() => alert("mas")}>
            <div>
              <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                ➕
              </Typography>
            </div>
          </BotonMasMenos>
        </Box>
      </Card>
    </Paper>
  );
}
