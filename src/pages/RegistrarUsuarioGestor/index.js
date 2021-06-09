import { Input, Switch } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import history from '../../services/history';
import {
  Section,
  Container,
  Information,
  Required,
  Button,
  ContainerForm,
} from './styles';
import TitlePage from '../../components/TitlePage';

function RegistrarUsuarioGestor({ match }) {
  const [$nome, setNome] = useState('');
  const [$usuario, setUsuario] = useState('');
  const [$senha, setSenha] = useState('');
  const [$admin, setAdmin] = useState(true);

  const { params: { id } } = match;

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const { data: { mensagem, usuario } } = await axios.post(`/usuario-admin/${id}`, {
        nome: $nome,
        usuario: $usuario,
        senha: $senha,
        master: $admin,
      });

      history.push(`/perfil-usuarios-gestores/${usuario}`);
      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;
        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  const onChangeAdmin = (checked) => {
    setAdmin(checked);
  };

  return (
    <Section>
      <Container>
        <TitlePage title="Criar Usuário Gestor" />
        <ContainerForm>
          <form
            style={{
              flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
            }}
            onSubmit={handleChange}
          >

            <Information>
              todos os campos são preenchimento obrigatório
              <Required>*</Required>
            </Information>

            <div>
              Nome:
              <Input
                onChange={({ target: { value } }) => setNome(value)}
                size="large"
                placeholder="nome"
                type="text"
              />
            </div>

            <div>
              Usuário:
              <Input
                onChange={({ target: { value } }) => setUsuario(value)}
                size="large"
                placeholder="usuário"
              />
            </div>

            <div>
              Senha:
              <Input.Password
                onChange={({ target: { value } }) => setSenha(value)}
                size="large"
                placeholder="senha"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              admin:
              <Switch
                checked={$admin}
                style={{ width: 60, marginTop: 5 }}
                defaultChecked
                onChange={onChangeAdmin}
              />
            </div>

            <Button type="submit">Criar Usuário</Button>
          </form>
        </ContainerForm>
      </Container>
    </Section>
  );
}

export default RegistrarUsuarioGestor;
