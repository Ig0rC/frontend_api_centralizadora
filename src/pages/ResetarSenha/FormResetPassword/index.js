import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from './styles';
import { Context } from '../../../Context/authcontext';
import axios from '../../../services/axios';
import { Input, Button } from '../../../styles/GenericStyles';

function FormResetPassword() {
  const { logout } = useContext(Context);
  const [$senhaAtual, setSenhaAtual] = useState('');
  const [$senhaNova, setSenhaNova] = useState('');
  const [$senhaNovaConfirm, setSenhaNovaConfirm] = useState('');

  const Atualizar = async (e) => {
    e.preventDefault();
    try {
      if ($senhaNova !== $senhaNovaConfirm) {
        return toast.error('Senha novas digitadas não coincidem!');
      }

      const { data: { mensagem } } = await axios.put('/senha', {
        senha_antiga: $senhaAtual,
        senha_atual: $senhaNova,
        senha_atual_confirm: $senhaNovaConfirm,
      });

      toast.success(`${mensagem}`);
      return logout();
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;
        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  return (
    <Form onSubmit={Atualizar}>
      <div>
        <p>Senha Atual</p>
        <Input
          type="password"
          name="senhaAtual"
          onChange={({ target: { value } }) => setSenhaAtual(value)}
          placeholder="senha atual"
          autoComplete="off"
        />
      </div>

      <div>
        <p>Senha nova</p>
        <Input
          type="password"
          name="senhaNovaUm"
          onChange={({ target: { value } }) => setSenhaNova(value)}
          placeholder="senha nova"
          autoComplete="off"
        />
      </div>

      <div>
        <p>Digite novamente a senha nova</p>
        <Input
          name="senhaNovaDois"
          type="password"
          onChange={({ target: { value } }) => setSenhaNovaConfirm(value)}
          placeholder="digite novamente a senha nova"
          autoComplete="off"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          type="submit"
        >
          Atualizar
        </Button>
      </div>
    </Form>
  );
}

export default FormResetPassword;
