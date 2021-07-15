import { useState, useEffect } from 'react';
import axios from '../../../services/axios';
import { Container } from './styles';

function UserInfo() {
  const [user, setUser] = useState('');
  const [nome, setNome] = useState('');
  const [fantasia, setFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/usuario-admin/');
      setUser(data.usuario);
      setNome(data.nome);
      setFantasia(data.nome_fantasia);
      setRazaoSocial(data.razao_social);
    })();
  }, []);

  return (
    <Container>
      <p>Nome: {user} </p>
      <p>Usuário: {nome} </p>
      <p>Nome Fantasia: {fantasia} </p>
      <p>Razão Social: {razaoSocial} </p>
    </Container>
  );
}

export default UserInfo;
