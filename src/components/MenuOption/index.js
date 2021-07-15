import { useContext, memo } from 'react';

import CommonUserMenu from '../CommonUserMenu';
import AdminUserMenu from '../AdminUserMenu';
import { Context } from '../../Context/authcontext';

function MenuOption() {
  const { menuComum, authorization } = useContext(Context);

  if (authorization === true) {
    if (menuComum === true) {
      return (
        <CommonUserMenu />
      );
    }
    return (
      <AdminUserMenu />
    );
  }
}

export default memo(MenuOption);
