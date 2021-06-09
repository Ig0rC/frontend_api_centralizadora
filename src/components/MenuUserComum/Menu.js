import { Menu } from 'antd';
import React, { useContext } from 'react';
import {
  DesktopOutlined,
  KeyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { MenuCustom } from './styles';
import { Context } from '../../Context/authcontext';

import './stylesCSS.css';

const { Item } = Menu;

const MenuUserComum = ({ children }) => {
  const { menuComum, logout } = useContext(Context);

  const clickLogout = () => {
    logout();
  };

  return (
    <MenuCustom open={menuComum}>

      <Menu
        style={{ height: '100vh' }}
        className="attMenu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed
      >
        <Menu.Item key="1" icon={<DesktopOutlined />}>
          Gerenciar Empresa Revenda
          <Link to={{ pathname: '/gerenciar-empresas' }} />
        </Menu.Item>

        <Item icon={<KeyOutlined />} key="4">
          Alterar senha
          <Link to={{ pathname: '/resetar-senha/' }} />
        </Item>

        <Menu.Item onClick={clickLogout} key="0" icon={<LogoutOutlined />}>
          sair do sistema
        </Menu.Item>
      </Menu>
      {children}
    </MenuCustom>
  );
};
export default MenuUserComum;
