import React, { useContext } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Context } from '../Context/authcontext';

import RegistrarEmpresaCliente from '../pages/RegistrarEmpresaCliente';
import CadastrarEmpresa from '../pages/PerfilEmpresaCliente';
import Login from '../pages/Login';
import GerenciarEmpresa from '../pages/GerenciarEmpresa';
import GerenciarEmpresaRevenda from '../pages/GerenciarEmpresaRevenda';
import MenuApp from '../components/Menu/Menu';
import { Container } from '../styles/GlobaisStyles';
import RegistrarEmpresaRevenda from '../pages/RegistrarEmpresaRevenda';
import PerfilEmpresaRevenda from '../pages/PerfilEmpresaRevenda';
import GerenciarApp from '../pages/GerenciarApp';
import RegistrarApp from '../pages/RegistrarApp';
import PerfilApp from '../pages/PerfilApp';
import GerenciarUsuariosVendedores from '../pages/GerenciarUsuariosVendedores';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authorization } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authorization) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

function AppRoutes() {
  return (

    <Switch>
      <CustomRoute exact path="/" component={Login} />
      <Container>
        <MenuApp />
        <CustomRoute isPrivate exact path="/register-empresa-cliente" component={RegistrarEmpresaCliente} />
        <CustomRoute isPrivate exact path="/gerenciar-empresas" component={GerenciarEmpresa} />
        <CustomRoute isPrivate exact path="/register/:id" component={CadastrarEmpresa} />
        <CustomRoute isPrivate exact path="/gerenciar-empresa-revenda" component={GerenciarEmpresaRevenda} />
        <CustomRoute isPrivate exact path="/registrar-empresa-revenda" component={RegistrarEmpresaRevenda} />
        <CustomRoute isPrivate exact path="/perfil-empresa-revenda/:id" component={PerfilEmpresaRevenda} />
        <CustomRoute isPrivate exact path="/gerenciar-app" component={GerenciarApp} />
        <CustomRoute isPrivate exact path="/registrar-app" component={RegistrarApp} />
        <CustomRoute isPrivate exact path="/perfil-app/:id" component={PerfilApp} />
        <CustomRoute isPrivate exact path="/gerenciar-usuarios/:id" component={GerenciarUsuariosVendedores} />
      </Container>
    </Switch>

  );
}
export default AppRoutes;
