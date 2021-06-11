import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { AuthProvider } from '../Context/authcontext';
import AppRoutes from './app.routes';
import MenuUserComum from '../components/MenuUserComum/Menu';
import MenuApp from '../components/Menu/Menu';
import GlobalStyles, { Container } from '../styles/GlobaisStyles';

import history from '../services/history';

function Root() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Container>
          <MenuApp />
          <MenuUserComum />
          <AppRoutes />
        </Container>
        <GlobalStyles />
        <ToastContainer
          autoClose={3000}
          className="toast-container"
        />

      </Router>
    </AuthProvider>
  );
}

export default Root;
