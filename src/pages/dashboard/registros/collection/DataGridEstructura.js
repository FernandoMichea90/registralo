import PropTypes from 'prop-types';

// @mui
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import { useEffect,useState } from 'react';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
  },
  {
    field: 'firstName',
    headerName: 'First name',
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

export default function DataGridBasic({ data,registros }) {

  console.log('DataGridBasic',registros);
  const [columnas, setcolumnas] = useState([])
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
    }
    
    
  }, [registros]);
  

  return <DataGrid columns={columnas} rows={registros} checkboxSelection disableSelectionOnClick />;
}
