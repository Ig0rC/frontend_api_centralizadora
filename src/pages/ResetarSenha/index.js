import { Input, Button } from 'antd';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import TitlePage from '../../components/TitlePage';
import { Context } from '../../Context/authcontext';
import axios from '../../services/axios';
import {
  Section, Container, ContainerInput,
} from './styles';

const { Password } = Input;

function ResetarSenha() {
  const { logout } = useContext(Context);
  const [$senhaAtual, setSenhaAtual] = useState('');
  const [$senhaNova, setSenhaNova] = useState('');
  const [$senhaNovaConfirm, setSenhaNovaConfirm] = useState('');

  const Atualizar = async () => {
    try {
      if ($senhaNova !== $senhaNovaConfirm) {
        return toast.error('senha nova digitada não coincidem!');
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
    <Section>
      <Container>
        <TitlePage title="Alterar Senha" />
        <ContainerInput>
          <div>
            <p>Senha Atual: </p>
            <Password
              onChange={({ target: { value } }) => setSenhaAtual(value)}
              placeholder="senha atual"
            />
          </div>

          <div>
            <p>Senha nova: </p>
            <Password
              onChange={({ target: { value } }) => setSenhaNova(value)}
              placeholder="senha nova"
            />
          </div>

          <div>
            <p>Digite novamente a senha nova: </p>
            <Password
              onChange={({ target: { value } }) => setSenhaNovaConfirm(value)}
              placeholder="digite novamente a senha nova"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              color="dark"
              onClick={Atualizar}
              style={{
                backgroundColor: '#274533',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '200px',
                width: '100%',
              }}
            >
              <p style={{ display: 'flex' }}>
                Atualizar
              </p>
            </Button>
          </div>

        </ContainerInput>
      </Container>
    </Section>
  );
}

export default ResetarSenha;
