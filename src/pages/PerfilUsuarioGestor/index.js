import { Input, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import {
  Section,
  Container,
  Information,
  Required,
  Button,
  ContainerForm,
  ButtonResetPassword,
} from './styles';
import TitlePage from '../../components/TitlePage';

function PerfilUsuarioGestor({ match }) {
  const [$nome, setNome] = useState('');
  const [$usuario, setUsuario] = useState('');
  const [$admin, setAdmin] = useState(true);
  const [$ativo, setAtivo] = useState(null);

  const { params: { id } } = match;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/usuario-admin/buscar/${id}`);
        setNome(data.nome);
        setUsuario(data.usuario);
        setAdmin(data.master);
        return setAtivo(data.ativo);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;
          return toast.error(`${mensagem}`);
        }

        return toast.error('Por favor, entre em contato com a SoftVendas');
      }
    })();
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const { data: { mensagem } } = await axios.put(`/usuario-admin/${id}`, {
        nome: $nome,
        usuario: $usuario,
        master: $admin,
        ativo: $ativo,
      });

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

  const onChageAtivo = (checked) => {
    setAtivo(checked);
  };

  const onChangeResetPassword = async () => {
    try {
      const { data: { mensagem } } = await axios.put(`/senha/${id}`);

      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;
        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  return (
    <Section>
      <Container>
        <TitlePage title="Perfil Usuário Gestor" />
        <ContainerForm>
          <form
            style={{
              flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
            }}
            onSubmit={handleChange}
          >
            <ButtonResetPassword onClick={onChangeResetPassword} type="button">
              senha padrão
            </ButtonResetPassword>

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
                value={$nome}
              />
            </div>

            <div>
              Usuário:
              <Input
                onChange={({ target: { value } }) => setUsuario(value)}
                size="large"
                placeholder="usuário"
                value={$usuario}
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

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              ativo:
              <Switch
                checked={$ativo}
                style={{ width: 60, marginTop: 5 }}
                defaultChecked
                onChange={onChageAtivo}
              />
            </div>

            <Button type="submit">Salvar</Button>
          </form>
        </ContainerForm>
      </Container>
    </Section>
  );
}

export default PerfilUsuarioGestor;
