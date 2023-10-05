import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
// import {Card as CardDiente} from '../componentes/Card';
import { Box, Divider, Stack, Container, Typography, Pagination, Card, CardHeader, Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
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
import { ObtenerRegistrosCollection, ObtenerRegistrosId, ObtenerRegistrosCollectionToday, CrearRegistros, CrearRegistrosCollection, EditarRegistrosCollection, BorrarRegistros } from '../../../../functions/registros_db';
import _mock, { randomInArray } from '../../../../_mock';
import DataGridBasic from './DataGridEstructura';
import { Grid, Dialog, DialogTitle, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';



// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCard,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../../sections/@dashboard/blog';
import { AnalyticsWidgetSummary } from '../../../../sections/@dashboard/general/analytics';
// import IconWidget from '../componentes/Card';
import { RegistroForm } from '../../../../sections/@dashboard/registros';
import { set } from 'lodash';
import { EcommerceYearlySales } from "../../../../sections/@dashboard/general/e-commerce";
import { adaptarDatosParaChart } from '../../../../functions/ChartInterface';
import { LoadingButton } from '@mui/lab';
import { fDateDayMonthYear } from 'src/utils/formatTime';
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




export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();
  const [count, increment, decrement, setCount] = useCounter();
  const [titulo, setTitulo] = useState([]);
  const [idObject, setIdObject] = useState(false);
  const [editando, setEditando] = useState(null);
  const [cambioHoy, setCambioHoy] = useState(false);
  const [loadingCount, setLoadingCount] = useState(null)

  function useCounter() {
    const [count, setCount] = useState(0);

    const increment = async () => {
      setLoadingCount("increment");
      setCount(prevCount => parseInt(prevCount) + 1);
      const updatedPost = post.map(item => {
        if (item.id === todayrecord.id) {
          return { ...item, cantidad: parseInt(item.cantidad) + 1 };
        } else {
          return item;
        }
      });
      // cargar los nuevos datos 
      reloadPostsAndChart(updatedPost);
    };

    const decrement = async () => {

      setLoadingCount("decrement")
      setCount(prevCount => (parseInt(prevCount) > 0 ? parseInt(prevCount) - 1 : 0));
      const updatedPost = post.map(item => {
        if (item.id === todayrecord.id) {
          return { ...item, cantidad: item.cantidad > 0 ? parseInt(item.cantidad) - 1 : 0 };
        } else {
          return item;
        }
      });
      // cargar los nuevos datos 
      reloadPostsAndChart(updatedPost);
    };

    return [count, increment, decrement, setCount];
  }

  const {
    query: { title },
  } = useRouter();

  const router = useRouter();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState([]);

  const [dataChart, setDataChart] = useState({
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    series: [
      {
        year: '2019',
        data: [
          { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
          { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
        ],
      },
      {
        year: '2020',
        data: [
          { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
          { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
        ],
      },
    ],

  });


  // estado del modal 
  const [Estado, setEstado] = useState(false)

  const [loadingPost, setLoadingPost] = useState(true);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [todayChangeLoading, setTodayChangeLoading] = useState(true);


  // funcion que carga los datos de posts y actualiza el chart 

  const reloadPostsAndChart = (updatePosts) => {
    setPost(updatePosts);
    var responseDataChart = adaptarDatosParaChart(updatePosts);
    setDataChart(responseDataChart);
  }

  const getPost = useCallback(async (id) => {

    try {
      // const response = await axios.get('/api/blog/post', {
      //   params: { title },
      // });
      console.log(id);
      console.log(title);
      var  respuesta = await ObtenerRegistrosCollection(id);
      var responseDataChart = adaptarDatosParaChart(respuesta);
      console.log(respuesta)
      respuesta = respuesta.map((item) => {
        return { ...item, fecha_ddmmm: fDateDayMonthYear(item.day,item.month,item.year) }
      })
      console.log(respuesta)
      console.log(responseDataChart);
      setDataChart(responseDataChart);
      await setPost(respuesta);
      setLoadingPost(false);
      setIdObject(id)
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setError(error.message);
    }
  }, [title]);


  const [todayrecord, setTodayrecord] = useState();


  //abrir ventana modal 
  const abrirVentanaModal = () => {
    setEstado(true)
  }

  // cerrar ventana modal

  const cerrarVentanaModal = () => {
    setEstado(false)
  }

  useEffect(() => {
   
    if (title) {
      getPost(title);
    }
    else{
      router.push(PATH_DASHBOARD.registros)
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
        const respuesta = await ObtenerRegistrosCollectionToday(new Date(), title);
        console.log(respuesta)
        setTodayrecord(respuesta);
        setCount(respuesta.cantidad);
        getPost(title);
        setTodayChangeLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    obtenerRegistro();
  }, [title]);

  // sumar o restar contador\
  useEffect(() => {
    // Loading Today Change 
    setTodayChangeLoading(true);
    // verificar si existe registro en todayrecord
    if (todayrecord?.id) {
      // editar registro
      const EditarRegistrosFront = async () => {
        try {

          // alert("este es el count "+count+"y el todayrecord cantidad "+todayrecord.cantidad)
          // if(count>todayrecord.cantidad){
          //   setLoadingCount("increment")
          // }else{
          //   setLoadingCount("decrement")
          // }
          //funcion para editar el registro segun id y cantidad
          var respuesta = await EditarRegistrosCollection(title, todayrecord.id, count)
          console.log(respuesta);
          setLoadingCount(null)
          setTodayChangeLoading(false);
          return respuesta;


        } catch (error) { console.log(error) }

      }
      EditarRegistrosFront();
    } else {
      // guardar registro
      const CrearRegistrosFront = async () => {
        try {
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
          var respuesta = await CrearRegistrosCollection(title, newRegistro)
          console.log(newRegistro);
          setTodayChangeLoading(false);
        } catch (error) {
          console.log(error)
        }
      }
      if (count > 0) {
        CrearRegistrosFront();
      }
    }
  }, [count]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenModalDelete(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenModalDelete(false);
  };



  const adaptarRegistro = (data) => {
    const year = data.fecha.getFullYear();
    const month = data.fecha.getMonth() + 1;
    const day = data.fecha.getDate();
    const fechaCodigo = `${day}${month}${year}`;
    const cantidad = parseInt(data.cantidad);
    var objeto = {
      fecha: data.fecha,
      fecha_codigo: fechaCodigo,
      cantidad: cantidad,
      day: day,
      month: month,
      year: year
    }
    return objeto;
  }

  const guardarRegistro = async (data) => {
    // buscar si existe el registro del dia de hoy.
    console.log(data);
    console.log(data.fecha)
    const response = await ObtenerRegistrosCollectionToday(data.fecha, title);
    console.log(response);
    // mostrar la respuesta   
    if (!response) {
      //  se adapta la data a guardar
      const newRegistro = adaptarRegistro(data);
      // se crea el nuevo registro 
      const response_registro = await CrearRegistrosCollection(idObject, newRegistro);
      // agregar el registro a la lista de registros
      await getPost(title);
      // cerrar el modal
      handleCloseModal();
      return true
    } else {
      // se  edita el registro de la base de datos
      const editRegistro = await EditarRegistrosCollection(title, response.id, data.cantidad);
      // ver la respuesta 
      console.log(editRegistro);
      // ver si puedo pedir los registros de nuevo
      await getPost(title);
      handleCloseModal();
      return true;
    }
  }

  const eliminarRegistro = async (id) => {
    setLoadingDelete(true);
    // eliminar el registro de la base de datos
    try{
      const response = await BorrarRegistros(id);
      setLoadingDelete(false);
      router.push(PATH_DASHBOARD.registros.list);
    }catch(error){
      console.log(error);
    }
  }

  const GetRegistrosCollectionToday = async (data) => {
    try {
      const fechahoy = new Date();
      // Establecer el inicio del dia de hoy 
      const inicioDiaHoy = new Date(fechahoy.getFullYear(), fechahoy.getMonth(), fechahoy.getDate(), 0, 0, 0);
      // Dia de hoy en timestamp (se guarda en segundos).
      const inicioDiaHoyTimestamp = Math.floor(inicioDiaHoy.getTime() / 1000);
      // Establecer el final del dia de hoy
      const finalDiaHoy = new Date(fechahoy.getFullYear(), fechahoy.getMonth(), fechahoy.getDate(), 23, 59, 59);
      // Dia de hoy final en timestamp (se guarda en segundos).
      const finalDiaHoyTimestamp = Math.floor(finalDiaHoy.getTime() / 1000);
      // buscar el registro del dia de hoy
      const response = await ObtenerRegistrosCollectionToday(title);
      if (!response) {
        // se crea el nuevo registro 
        console.log(data);
      } else {
        console.log(data);
      }

    } catch (error) {
      console.log(error)
    }
  }
  const toEditCollection = (id) => {
    router.push(PATH_DASHBOARD.registros.editar(id));
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
              href: PATH_DASHBOARD.registros.list,
            },
            {
              name: titulo?.title,
            },
          ]}
          action={
            <>
              <IconButton sx={{ color: red[900] }} onClick={() => handleOpenDeleteModal()}>
                <Iconify icon="ion:trash-outline" />
              </IconButton>
              <IconButton onClick={() => toEditCollection(title)}>
                <Iconify icon="icon-park-solid:setting" />
              </IconButton>
              <Button onClick={() => setOpenModal(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Nuevo Registro
              </Button>
            </>


          }
        />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              {/* <IconWidget loadingCount={loadingCount} Loading={todayChangeLoading} title={titulo} total={count} increment={increment} decrement={decrement} icon={'ant-design:android-filled'} cambioHoy={cambioHoy} setCambioHoy={setCambioHoy} /> */}
            </Grid>
            <Grid item xs={12} sm={6} md={9}>
              <EcommerceYearlySales
                title="Informe"
                color={titulo.color}
                subheader=""
                chart={dataChart}
              />
            </Grid>
          </Grid>
          <Stack spacing={5}>
            <Card>
              <CardHeader title="Basic" sx={{ mb: 2 }} />
              <Box sx={{ height: 390 }}>
                {
                  post.length > 0 &&
                  <DataGridBasic
                    data={_dataGrid}
                    registros={post}
                    setRegistros={setPost}
                    title={title}
                    setOpenModal={setOpenModal}
                    setEditando={setEditando}
                  />
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
        <RegistrosForm guardarRegistro={guardarRegistro} setOpenModal={setOpenModal} editando={editando} title={title} setCambioHoy={setCambioHoy} setCount={setCount}/>
      </Dialog>
      {/* Modal Borrar Registros  */}
      <Dialog fullWidth open={openModalDelete} onClose={handleCloseDeleteModal}>
        <DialogTitle> Registro: {titulo?.title}. </DialogTitle>
        <DialogContent>
           <DialogContentText>
            Si estás seguro de que deseas borrar el registro  haz click en el botón "Borrar".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}  variant="secondary">
            Cancelar
          </Button>
          <LoadingButton onClick={()=>eliminarRegistro(title)}  variant="outlined" color="error" loading={loadingDelete}>
            Borrar
          </LoadingButton>
        </DialogActions>
      </Dialog>


    </>
  );
}
