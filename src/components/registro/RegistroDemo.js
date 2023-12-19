import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Grid, RadioGroup, Tooltip, CardActionArea, FormControlLabel, Radio } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_FIGMA_PREVIEW, PATH_FREE_VERSION } from '../../routes/paths';
import { useSettingsContext } from '../../components/settings';
import { Emoji } from 'emoji-picker-react';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import SvgColor from '../../components/svg-color';
import Iconify from '../../components/iconify';
import RegistroCardIndex from 'src/sections/@dashboard/registros/RegistroCardIndex';

const data_icono = [
  { icono: "1f9b7", nombre: "Diente" },
  { icono: "1f4a7", nombre: "Agua" },
  { icono: "1f6ac", nombre: "Cigarro" },
  { icono: "2615", nombre: "Cafe" },
  { icono: "1f48a", nombre: "IbuProfeno" }
]




function Options({ onChangeColor, colorName }) {
  const { themeColorPresets, onChangeColorPresets, presetsOption } = useSettingsContext();

  return (
    <RadioGroup
      name="themeColorPresets"
      value={colorName}
      onChange={
        (event) => {
          onChangeColor(event);
          // onChangeColorPresets(event);
        }
      }
      sx={{ my: 5 }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 100,
          height: 88,
          mx: 'auto',
          position: 'relative',
        }}
      >
        {presetsOption.map((color, index) => {
          const { name, value } = color;
          const isSelected = colorName === name;


          return (
            <Tooltip key={name} title={name}>
              <CardActionArea
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  position: 'absolute',
                  color: 'common.white',
                  ...(index === 0 && { bottom: 0 }),
                  ...(index === 1 && { left: 19 }),
                  ...(index === 2 && { right: 19 }),
                  ...(index === 3 && { top: 0, left: 0 }),
                  ...(index === 4 && { top: 0 }),
                  ...(index === 5 && { top: 0, right: 0 }),
                }}
              >
                <Box
                  sx={{
                    bgcolor: value,
                    width: 1,
                    height: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  {isSelected && <Iconify icon="eva:color-picker-fill" width={16} />}

                  <FormControlLabel
                    label=""
                    value={name}
                    control={<Radio sx={{ display: 'none' }} />}
                    sx={{
                      top: 0,
                      left: 0,
                      margin: 0,
                      width: 1,
                      height: 1,
                      position: 'absolute',
                    }}
                  />
                </Box>
              </CardActionArea>
            </Tooltip>
          );
        })}
      </Stack>
    </RadioGroup>
  );
}

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'relative',
  },
  [theme.breakpoints.down('md')]: {
    overflow: 'hidden',
  },
  padding: "50px 0px 50px 0px"

}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100vh',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: "'Pixelify Sans','Barlow', sans-serif",
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: `3rem`,
  },
}));





// ----------------------------------------------------------------------

export default function RegistroDemo() {

  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);
  const  isDesktop= useResponsive('up','md');
  const [color, setColor] = useState("#00AB55");
  const [colorName, setColorName] = useState("default");
  const [icono, setIcono] = useState({ nombre: "Diente", icono: "1f9b7" });

  // onChangeColor 
  const onChangeColor = (event) => {
    var color = event.target.value;
    switch (color) {
      case "red":
        setColor("#FF3030");
        setColorName("red");
        break;
      case "purple":
        setColor("#7635dc");
        setColorName("purple");
        break;
      case "blue":
        setColor("#2065D1");
        setColorName("blue");
        break;
      case "orange":
        setColor("#fda92d");
        setColorName("orange");
        break;
      // celeste
      case "cyan":
        setColor("#078DEE");
        setColorName("cyan");
        break;
      //default
      default:
        setColor("#00AB55");
        setColorName("default");

    }
  }


  useEffect(
    () =>
      scrollYProgress.onChange((scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(false);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  if (hide) {
    return null;
  }

  return (
<>  
{isDesktop && 
    <div style={{ height: "100%",margin:"auto",height:"100vh" }}>
        <Content onChangeColor={onChangeColor} color={color} colorName={colorName} icono={icono} setIcono={setIcono} />
    </div>
}  
</>    

  );
}

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

function Content({ onChangeColor, color, colorName, icono, setIcono }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  };

  return (
    <Stack sx={{ margin: 'auto', height: '100%' }}>
      <Stack component={m.div}  sx={{ width: 344, position: 'relative', margin: 'auto' }}>
        <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginBottom: "20px", zIndex: 1, }}>
          {data_icono.map((platform, key) => (
            <a key={key} style={{ cursor: "pointer" }} onClick={(event) => {
              setIcono(platform);
            }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ height: "45px", width: "45px", backgroundColor: "#ffffff3b", borderRadius: "50%", margin: "auto", ':hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' } }}>
                <Emoji unified={platform.icono} size={25} />
              </Stack>
            </a>
          ))}
        </Stack>
        <RegistroCardIndex color={color} icono={icono} />
        <div>
          <Options onChangeColor={onChangeColor} colorName={colorName} />
        </div>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------
