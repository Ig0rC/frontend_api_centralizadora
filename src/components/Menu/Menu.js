import { Menu } from 'antd';
import React, { useState, useContext } from 'react';
import {
  AppstoreAddOutlined,
  // MenuUnfoldOutlined,
  DesktopOutlined,
  UserAddOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { MenuCustom } from './styles';
import { Context } from '../../Context/authcontext';

import './stylesCSS.css';

const { SubMenu, Item } = Menu;

const MenuApp = ({ children }) => {
  const { menuOpen, logout } = useContext(Context);
  const [collapsed, setCollapsed] = useState(true);
  const [option, setOption] = useState('Minimizar Menu');

  const toggleCollapsed = () => {
    if (option === 'Expandir Menu') {
      setOption('Minimizar Menu');
    } else {
      setOption('Expandir Menu');
    }
    setCollapsed(!collapsed);
  };

  const clickLogout = () => {
    logout();
    toggleCollapsed();
  };

  return (
    <MenuCustom open={menuOpen}>

      <Menu
        style={{ height: '100vh' }}
        className="attMenu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
      >
        <Item icon={<AppstoreAddOutlined />} key="1">
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

        <SubMenu key="4" icon={<UserAddOutlined />} title="Gerenciar Empresas">
          <Menu.Item key="5">
            Usuários Gestor
            <Link to={{ pathname: '/register-empresa-cliente' }} />
          </Menu.Item>

        </SubMenu>

        <SubMenu key="5" icon={<FileAddOutlined />} title="Cadastrar">
          <Menu.Item key="5">
            Empresa Cliente
            <Link to={{ pathname: '/register-empresa-cliente' }} />
          </Menu.Item>

          <Menu.Item key="6">
            Empresa Revenda
            <Link to={{ pathname: '/registrar-empresa-revenda' }} />
          </Menu.Item>
        </SubMenu>

        <Menu.Item onClick={clickLogout} key="0" icon={<LogoutOutlined />}>
          sair do sistema
        </Menu.Item>
      </Menu>
      {children}
    </MenuCustom>
  );
};
export default MenuApp;
