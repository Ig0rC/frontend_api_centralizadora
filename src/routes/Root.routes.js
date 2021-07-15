import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { AuthProvider } from '../Context/authcontext';
import AppRoutes from './app.routes';
import GlobalStyles from '../styles/GlobaisStyles';
import history from '../services/history';

function Root() {
  return (
    <AuthProvider>
      <Router history={history}>
        <AppRoutes />
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
