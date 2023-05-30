import  PropTypes from 'prop-types';
import { useState} from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
    Stack,
    Button,
    TableRow,
    Checkbox,
    MenuItem,
    TableCell,
    IconButton,
    Link,
  } from '@mui/material';
  import { fDate } from 'src/utils/formatTime';
  import Label from 'src/components/label/Label';
  import Image from 'src/components/image/Image';
  import Iconify from 'src/components/iconify/Iconify';
  import ConfirmDialog from 'src/components/confirm-dialog/ConfirmDialog';
  import MenuPopover from 'src/components/menu-popover/MenuPopover';


ProductTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onViewRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
  };
  
  export default function ProductTableRow({
    row,
    selected,
    onSelectRow,
    onDeleteRow,
    onEditRow,
    onViewRow,
  }) {
    const { name, cover, createdAt, inventoryType, price } = row;

    const [openConfirm, setOpenConfirm] = useState(false);
  
    const [openPopover, setOpenPopover] = useState(null);
  
    const handleOpenConfirm = () => {
      setOpenConfirm(true);
    };
  
    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };
  
    const handleOpenPopover = (event) => {
      setOpenPopover(event.currentTarget);
    };
  
    const handleClosePopover = () => {
      setOpenPopover(null);
    };
  
    return (
      <>
        <TableRow hover selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
         <TableCell align="center">{row.fecha_codigo}</TableCell>
          <TableCell align="center">
            {row.cantidad}
          </TableCell>     
          <TableCell align="center">
            <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        </TableRow>
  
        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="right-top"
          sx={{ width: 140 }}
        >
          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
  
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </MenuPopover>
  
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Delete"
          content="Are you sure want to delete?"
          action={
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Delete
            </Button>
          }
        />
      </>
    );
  }
  