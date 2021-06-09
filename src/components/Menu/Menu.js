import { Menu } from 'antd';
import React, { useContext } from 'react';
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  KeyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { MenuCustom } from './styles';
import { Context } from '../../Context/authcontext';

import './stylesCSS.css';

const { SubMenu, Item } = Menu;

const MenuApp = ({ children }) => {
  const { menuAdmin, logout } = useContext(Context);

  const clickLogout = () => {
    logout();
  };

  return (
    <MenuCustom open={menuAdmin}>

      <Menu
        style={{ height: '100vh' }}
        className="attMenu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed
      >
        <Item icon={<AppstoreAddOutlined size={20} />} key="1">
          Gerenciar Apps
          <Link to={{ pathname: '/gerenciar-app' }} />
        </Item>

        <SubMenu key="2" icon={<DesktopOutlined />}>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            Gerenciar Empresa Revenda
            <Link to={{ pathname: '/gerenciar-empresa-revenda' }} />
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            Gerenciar Empresa Cliente
            <Link to={{ pathname: '/gerenciar-empresas' }} />
          </Menu.Item>
        </SubMenu>

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
export default MenuApp;
