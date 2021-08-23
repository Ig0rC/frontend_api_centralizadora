import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Redirect, Route,
} from 'react-router-dom';
import { Context } from '../Context/authcontext';
import RegisterClientCompany from '../pages/RegistrarEmpresaCliente';
import CadastrarEmpresa from '../pages/PerfilEmpresaCliente';
import Login from '../pages/Login';
import GerenciarEmpresa from '../pages/GerenciarEmpresaCliente';
import GerenciarEmpresaRevenda from '../pages/GerenciarEmpresaRevenda';
import RegistrarEmpresaRevenda from '../pages/RegistrarEmpresaRevenda';
import PerfilEmpresaRevenda from '../pages/PerfilEmpresaRevenda';
import GerenciarApp from '../pages/GerenciarApp';
import RegistrarApp from '../pages/RegistrarApp';
import PerfilApp from '../pages/PerfilApp';
import GerenciarUsuariosVendedores from '../pages/GerenciarUsuariosVendedores';
import PerfilUsuarioVendedor from '../pages/PerfilUsuarioVendedor';
import GerenciarUsuariosGestores from '../pages/GerenciarUsuariosGestores';
import RegistrarUsuarioGestor from '../pages/RegistrarUsuarioGestor';
import PerfilUsuarioGestor from '../pages/PerfilUsuarioGestor';
import Perfil from '../pages/ResetarSenha';
import Page404 from '../pages/Page404';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authorization } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authorization) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

function AppRoutes() {
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path="/" component={Login} />
      <CustomRoute isPrivate exact path="/cadastrar-empresa-cliente" component={RegisterClientCompany} />
      <CustomRoute isPrivate exact path="/gerenciar-empresas" component={GerenciarEmpresa} />
      <CustomRoute isPrivate exact path="/register/:id" component={CadastrarEmpresa} />
      <CustomRoute isPrivate exact path="/gerenciar-empresa-revenda" component={GerenciarEmpresaRevenda} />
      <CustomRoute isPrivate exact path="/cadastrar-empresa-revenda" component={RegistrarEmpresaRevenda} />
      <CustomRoute isPrivate exact path="/perfil-empresa-revenda/:id" component={PerfilEmpresaRevenda} />
      <CustomRoute isPrivate exact path="/gerenciar-app" component={GerenciarApp} />
      <CustomRoute isPrivate exact path="/cadastrar-app" component={RegistrarApp} />
      <CustomRoute isPrivate exact path="/perfil-app/:id" component={PerfilApp} />
      <CustomRoute isPrivate exact path="/gerenciar-usuarios-vendedores/:id" component={GerenciarUsuariosVendedores} />
      <CustomRoute isPrivate exact path="/perfil-usuario/:id" component={PerfilUsuarioVendedor} />
      <CustomRoute isPrivate exact path="/gerenciar-usuarios-gestores/:id" component={GerenciarUsuariosGestores} />
      <CustomRoute isPrivate exact path="/registrar-usuarios-gestores/:id" component={RegistrarUsuarioGestor} />
      <CustomRoute isPrivate exact path="/perfil-usuarios-gestores/:id" component={PerfilUsuarioGestor} />
      <CustomRoute isPrivate exact path="/perfil/" component={Perfil} />
      <CustomRoute isPrivate={false} component={Page404} />
    </Switch>
  );
}

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
};

export default AppRoutes;
