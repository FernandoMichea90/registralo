import PropTypes from 'prop-types';

// @mui
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Table, TableBody,TableContainer,Tooltip } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import { useEffect,useState } from 'react';
import { TableHeadCustom } from 'src/components/table';
import DataRow from './DataRow';
import {useTable,TableSelectedAction} from 'src/components/table';
import { BorrarRegistrosCollectionIdCollection, ObtenerRegistrosCollectionId } from 'src/functions/registros_db';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
  },
  {
    field: 'fecha_codigo',
    headerName: 'Fecha',
    width: 160,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 160,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 120,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    flex: 1,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  },
];


DataGridBasic.propTypes = {
  data: PropTypes.array,
};


const TABLE_HEAD = [

  { id: 'fecha', label: 'Fecha', align: 'center' },
  { id: 'cantidad', label: 'Cantidad', align: 'center' },
  { id: 'action', label: 'Action', align: 'center'},
 
 
];





export default function DataGridBasic({ data,registros,setRegistros,title,setOpenModal,setEditando }) {

  const columns2 = [
    {
      field:'fecha_codigo',
      headerName:'Fecha',
      width:120,
      editable:false
    },
    {
      field:'cantidad',
      headerName:'Cantidad',
      width:120,
      editable:false
    },
      {
      field: 'action',
      headerName: ' ',
      width: 80,
      align: 'right',
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      ),
    }
  
  ];
  //---------------------------------------------------------------------------------
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });
  //---------------------------------------------------------------------------------
  const [columnas, setcolumnas] = useState([])
  const [openPopover, setOpenPopover] = useState(null);
  const[cargando,setcargando] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handlePopoverOpen = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenPopover(null);
  };

  // Borrar Registro 
  const handleDeleteRow=async(id)=>{
  
    const response = await BorrarRegistrosCollectionIdCollection(title,id);
    if(response){
      const deleteRow = registros.filter((row) => row.id !== id);
      setSelected([]);
      setRegistros(deleteRow);
    }else{
     setSelected([]);
    }
  }

  // Editar Registro 
  const handleEditRow=async(id)=>{
    console.log('editar registro',id);
    setEditando(id);
    const response = await  ObtenerRegistrosCollectionId(title,id);
    console.log('Registro obtenido',response);
    
    
    setOpenModal(true);
  }



  useEffect(() => {
    console.log('paso por el use effect');
    if(registros?.length > 0){
    console.log('registros',registros[0]);
    Object.keys(registros[0]).forEach((key) => {
      console.log('key',key);
      columnas.push({
        field: key,
        headerName: key,
        width: 120,
        editable: true,
      });
    });
    setcargando(true)
    }
    
    
  }, [registros]);
   

  return (<>
  {cargando &&
  
  <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
  <TableSelectedAction
    dense={dense}
    numSelected={selected.length}
    rowCount={registros.length}
    onSelectAllRows={(checked) =>
      onSelectAllRows(
        checked,
        registros.map((row) => row.id)
      )
    }
    action={
      <Tooltip title="Delete">
        <IconButton color="primary" onClick={handleOpenConfirm}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </Tooltip>
    }
  />

     <Table sx={{minWidth:960}}>
       <TableHeadCustom
         headLabel={TABLE_HEAD}
         rowCount={registros?.length}
         onSelectAllRows={(checked)=>
          onSelectAllRows(
            checked,
            registros?.map((row) => row.id)
          )
         }
       >
       </TableHeadCustom>
       <TableBody>
        {registros?.map((row) => (
           <DataRow 
             key={row.id}
             row={row} 
             selected={selected.includes(row.id)}
             onSelectRow={() => onSelectRow(row.id)}
             onDeleteRow={() => handleDeleteRow(row.id)}
             onEditRow={() => handleEditRow(row.id)}
             onViewRow={() => handleViewRow(row.fecha_codigo)}
             
             />
         ))}
       </TableBody>
     </Table>
    </TableContainer>
    }

     </>)
} 
