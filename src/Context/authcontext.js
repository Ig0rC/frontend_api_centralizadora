import React, {
  createContext, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import history from '../services/history';
import axios from '../services/axios';

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [authorization, setAuthorization] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('SV@token');

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthorization(true);
      setMenuOpen(true);
      return setLoading(false);
    }

    history.push('/');
    return setLoading(false);
  }, []);

  async function loginIn({ user, password }) {
    try {
      const { data: { token } } = await axios.post('/token', {
        usuario: user,
        senha: password,
      });

      localStorage.setItem('SV@token', JSON.stringify(token));

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      setAuthorization(true);
      setMenuOpen(true);

      history.push('/register');
    } catch (error) {
      toast.error('Usuário ou senha inválidos');
    }
  }

  async function logout() {
    setMenuOpen(false);
    setAuthorization(false);
    localStorage.clear();
    history.push('/');
  }

  return (
    <Context.Provider value={{
      authorization, logout, loading, loginIn, menuOpen,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export { AuthProvider, Context };
