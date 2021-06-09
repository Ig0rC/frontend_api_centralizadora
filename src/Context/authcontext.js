import React, {
  createContext, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import history from '../services/history';
import axios from '../services/axios';

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [authorization, setAuthorization] = useState(false);
  const [menuComum, setMenuComum] = useState(false);
  const [menuAdmin, setmenuAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('SV@token');
    const painel = localStorage.getItem('SV@painel');

    if (token && painel) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      if (JSON.parse(painel) === '23ca2844-c863-11eb-b8bc-0242ac130003') {
        setAuthorization(true);
        setmenuAdmin(true);
        setMenuComum(false);
      } else if (JSON.parse(painel) === '2f6dc3f4-c863-11eb-b8bc-0242ac130003') {
        setAuthorization(true);
        setMenuComum(true);
        setmenuAdmin(false);
      }

      return setLoading(false);
    }

    history.push('/');
    return setLoading(false);
  }, []);

  async function loginIn({ user, password }) {
    try {
      const { data: { token, painel } } = await axios.post('/token', {
        usuario: user,
        senha: password,
      });

      localStorage.setItem('SV@token', JSON.stringify(token));

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      if (painel === '23ca2844-c863-11eb-b8bc-0242ac130003') {
        setAuthorization(true);
        setmenuAdmin(true);
        setMenuComum(false);
        localStorage.setItem('SV@painel', JSON.stringify(painel));
        return history.push('/gerenciar-empresas');
      }
      setmenuAdmin(false);
      setAuthorization(true);
      setMenuComum(true);

      localStorage.setItem('SV@painel', JSON.stringify(painel));
      return history.push('/gerenciar-empresas');
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  }

  async function logout() {
    setmenuAdmin(false);
    setAuthorization(false);
    localStorage.clear();
    history.push('/');
  }

  return (
    <Context.Provider value={{
      authorization, logout, loading, loginIn, menuAdmin, menuComum,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export { AuthProvider, Context };
