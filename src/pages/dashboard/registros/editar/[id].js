import React from 'react'
import DashboardLayout from '../../../../layouts/dashboard/DashboardLayout';
import RegistrosCrear from '../crear';
import { useRouter } from 'next/router';
import { ObtenerRegistrosId } from '../../../../functions/registros_db';
import { isLength, set } from 'lodash';
import { COLOR_OPTIONS } from '../../../../data/colores';

EditarRegistro.getLayout= (page) => <DashboardLayout>{page}</DashboardLayout>;

export default  function EditarRegistro () {
  const router = useRouter(); 
  const { id } = router.query;
  //stata de registro
  const [registro, setRegistro] = React.useState(null);
  // Obtener colores 
  let colores = COLOR_OPTIONS;

  React.useEffect(() => {
    const obtenerRegistroporId = async () => {
      if (id) {
      const response= await ObtenerRegistrosId(id);
      setRegistro({...response, id: id});
    }
    };
  
    obtenerRegistroporId();
  }, [id]);
  return (
    <RegistrosCrear registro={registro} COLOR_OPTIONS={COLOR_OPTIONS} />
  )
}

