import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
// import {Card as CardDiente} from '../componentes/Card';
import { Box, Divider, Stack, Container, Typography, Pagination, Card, CardHeader, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import axios from '../../../../utils/axios';
// layouts
import DashboardLayout from '../../../../layouts/dashboard'
//next 
import NextLink from 'next/link';
// Iconify
import Iconify from "../../../../components/iconify";
//Registro Form 
import RegistrosForm from './RegistrosForm';

// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonPostDetails } from '../../../../components/skeleton';
import { ObtenerRegistrosCollection, ObtenerRegistrosId, ObtenerRegistrosCollectionToday, CrearRegistros, CrearRegistrosCollection, EditarRegistrosCollection } from 'src/functions/registros_db';
import _mock, { randomInArray } from 'src/_mock';
import DataGridBasic from './DataGridEstructura';
import { Grid, Dialog, DialogTitle } from '@mui/material';


// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCard,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../../sections/@dashboard/blog';
import { AnalyticsWidgetSummary } from 'src/sections/@dashboard/general/analytics';
import CardDiente from '../componentes/CardDiente';
import { RegistroForm } from 'src/sections/@dashboard/registros';

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export const _dataGrid = [...Array(36)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['online', 'away', 'busy']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));


function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return [count, increment, decrement, setCount];
}


export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();
  const [count, increment, decrement, setCount] = useCounter();
  const [titulo, setTitulo] = useState([]);


  const {
    query: { title },
  } = useRouter();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState([]);

  const [loadingPost, setLoadingPost] = useState(true);

  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(true);

  const getPost = useCallback(async (id) => {

    try {
      // const response = await axios.get('/api/blog/post', {
      //   params: { title },
      // });
      const respuesta = await ObtenerRegistrosCollection(id);
      setPost(respuesta);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setError(error.message);
    }
  }, [title]);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      setRecentPosts(response.data.recentPosts);
    } catch (error) {
      console.error(error);
    }
  }, [title]);

  const [todayrecord, setTodayrecord] = useState();


  useEffect(() => {
    if (title) {
      getPost(title);
    }
  }, [getPost, title]);

  // obtener el titulo del registro
  useEffect(() => {
    // buscar registro del dia de hoy 
    const obtenerTitulo = async (id) => {
      try {

        const respuesta = await ObtenerRegistrosId(id);
        setTitulo(respuesta);
      } catch (error) {
        console.log(error)
      }
    }
    obtenerTitulo(title);


  }, []);

  // obtener el registro del dia de hoy
  useEffect(() => {
    // buscar registro del dia de hoy
    const obtenerRegistro = async () => {
      try {
        const respuesta = await ObtenerRegistrosCollectionToday(title);
        console.log('esta es la respuesta del registro del dia de hoy' + JSON.stringify(respuesta))
        setTodayrecord(respuesta);
        setCount(respuesta.cantidad);

      } catch (error) {
        console.log(error)
      }
    }
    obtenerRegistro();
  }, [title]);

  // sumar o restar contador\
  useEffect(() => {
    console.log(count);
    // verificar si existe registro en todayrecord
    if (todayrecord?.id) {
      // editar registro
      const EditarRegistrosFront = async () => {
        try {
          //funcion para editar el registro segun id y cantidad
          var respuesta = await EditarRegistrosCollection(title, todayrecord.id, count)
          console.log('esta es la respuesta de editar' + JSON.stringify(respuesta))

        } catch (error) { console.log(error) }

      }
      EditarRegistrosFront();
    } else {
      // guardar registro
      const CrearRegistrosFront = async () => {
        try {
          // fecha de hoy 
          var today = new Date();
          // crear registro
          var newRegistro = {
            cantidad: count,
            fecha: new Date(),
            dia: today.getDate(),
            mes: today.getMonth() + 1,
            ano: today.getFullYear(),
            fecha_codigo: `${today.getDate()}${(today.getMonth() + 1)}${today.getFullYear()}`,
          };
          console.log('paso por la respuesta');
          var respuesta = await CrearRegistrosCollection(title, newRegistro)
          // si la respuesta es null 
          if (respuesta == null) {
            alert("Error al guardar el registro")
          } else {
            alert("Registro guardado")
          }
        } catch (error) {
          console.log(error)
        }
      }
      // CrearRegistrosFront();
    }
  }, [count]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const guardarRegistro = async () => {
      alert("Registro guardado");
  }


  return (
    <>
      <Head>
        <title>{`Blog: ${post?.title || ''} | Minimal UI`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Registros"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Registros',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: titulo?.title,
            },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.eCommerce.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Nuevo Registro
              </Button>
            </NextLink>
          }
        />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <CardDiente title={titulo.title} total={count} increment={increment} decrement={decrement} icon={'ant-design:android-filled'} ></CardDiente>
            </Grid>
          </Grid>
          <Stack spacing={5}>
            <Card>
              <CardHeader title="Basic" sx={{ mb: 2 }} />
              <Box sx={{ height: 390 }}>
                {
                  post.length > 0 &&
                  <DataGridBasic data={_dataGrid} registros={post} />
                }
              </Box>
            </Card>
          </Stack>
        </Container>
        {error && !loadingPost && <Typography variant="h6">404 {error}</Typography>}
        {loadingPost && <SkeletonPostDetails />}
      </Container>
      <Dialog fullWidth maxWidth="xs" open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Titulo de Registros </DialogTitle>
        <RegistrosForm guardarRegistro={guardarRegistro}>
        </RegistrosForm>
      </Dialog>


    </>
  );
}
