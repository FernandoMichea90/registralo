// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor  src={`${process.env.REACT_APP_BASE_PATH}/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  dashboard: icon('ic_dashboard'),
  new: icon('ic_make_brand'),
  list: icon('ic_list')

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Nuevo Registro', path: PATH_DASHBOARD.registros.crear, icon: ICONS.new },
      { title: 'Registros', path: PATH_DASHBOARD.registros.list, icon: ICONS.list },

    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
    // {
    //   subheader: 'section',
    //   items: [
    //   ],
    // },

];

export default navConfig;
