import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import axios from '../../../services/axios';
import history from '../../../services/history';

import { Input, Select, Button } from '../../../styles/GenericStyles';
import { Information, Form, DivButton } from './styles';

function ManagerUserForm({ id }) {
  const [$nome, setNome] = useState('');
  const [$usuario, setUsuario] = useState('');
  const [$senha, setSenha] = useState('');
  const [$admin, setAdmin] = useState(false);
  const [$confirmSenha, setConfirmSenha] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      if ($senha !== $confirmSenha) {
        return toast.error('Senha não coincidem');
      }

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

  return (
    <Form onSubmit={handleCreateUser}>

      <Information>
        todos os campos são preenchimento obrigatório
        <span>*</span>
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
        <Input
          type="password"
          onChange={({ target: { value } }) => setSenha(value)}
          placeholder="senha"
        />
      </div>

      <div>
        Confirma senha:
        <Input
          type="password"
          onChange={({ target: { value } }) => setConfirmSenha(value)}
          placeholder="confirma senha"
        />
      </div>

      <div>
        Gestor:
        <Select
          value={$admin}
          onChange={({ target: { value } }) => setAdmin(value)}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>

        </Select>
      </div>

      <DivButton>
        <Button type="submit">Criar</Button>
      </DivButton>
    </Form>
  );
}

ManagerUserForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ManagerUserForm;
