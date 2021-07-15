import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input, Select, Button } from '../../../styles/GenericStyles';
import axios from '../../../services/axios';
import { Information, Form, Divbutton } from './styles';

function FormUpdateUser({ id }) {
  const [$nome, setNome] = useState('');
  const [$usuario, setUsuario] = useState('');
  const [$admin, setAdmin] = useState('');
  const [$ativo, setAtivo] = useState('');

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

  const handleUpdateUser = async (e) => {
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

  const handleResetPassword = async () => {
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
    <Form onSubmit={handleUpdateUser}>
      <Button color="#ff6900" onClick={handleResetPassword} type="button">
        senha padrão
      </Button>

      <Information>
        todos os campos são preenchimento obrigatório
        <span>*</span>
      </Information>

      <div>
        Nome
        <Input
          onChange={({ target: { value } }) => setNome(value)}
          placeholder="nome"
          type="text"
          value={$nome}
        />
      </div>

      <div>
        Usuário
        <Input
          onChange={({ target: { value } }) => setUsuario(value)}
          size="large"
          placeholder="usuário"
          value={$usuario}
        />
      </div>

      <div>
        Gestor
        <Select
          value={$admin}
          onChange={({ target: { value } }) => setAdmin(value)}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
      </div>

      <div>
        Ativo
        <Select
          value={$ativo}
          onChange={({ target: { value } }) => setAtivo(value)}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
      </div>
      <Divbutton>
        <Button type="submit">Salvar</Button>
      </Divbutton>
    </Form>
  );
}

export default FormUpdateUser;
