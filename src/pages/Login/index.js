import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../../Context/authcontext';

import {
  Container,
  ContainerCenter,
  // ContainerButton,
  Button, Input, ContainerInput, LogoS, ContainerImage, Background,
} from './styles';

import logo from '../../images/logo_v1.png';

import history from '../../services/history';

const Login = () => {
  const { loginIn, authorization } = useContext(Context);

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (authorization === true) {
      history.push('/gerenciar-empresas');
    }
  }, [authorization]);

  function entrar(e) {
    e.preventDefault();
    if (user === null || password === null) {
      return toast.error('Preencha todos os campos!');
    }
    return loginIn({ user, password });
  }

  return (
    <Background>
      <Container>
        <ContainerCenter>
          <ContainerImage>
            <LogoS src={logo} alt="" />
          </ContainerImage>

          <ContainerInput onSubmit={entrar}>
            <Input
              onChange={({ target: { value } }) => setUser(value)}
              placeholder="usuário"
              type="text"
            />
            <Input
              onChange={({ target: { value } }) => setPassword(value)}
              placeholder="senha"
              type="password"
            />

            <Button type="submit">entrar</Button>

          </ContainerInput>
        </ContainerCenter>
      </Container>
    </Background>
  );
};

export default Login;
