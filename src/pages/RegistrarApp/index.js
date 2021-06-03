import { Input } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Section, Container, Information, Required, Button, DivForm,
} from './styles';

import TitlePage from '../../components/TitlePage';

import axios from '../../services/axios';
import history from '../../services/history';

function RegistrarApp() {
  const [$nome, setNome] = useState('');
  const [$codigoConstumizado, setCodigoConstumizado] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      if (!$nome || !$codigoConstumizado) {
        return toast.error('Preencha todos os campos!');
      }

      try {
        const { data: { mensagem, id } } = await axios.post('/apptype', {
          nome: $nome,
          codigo_constumizado: $codigoConstumizado,
        });

        toast.success(`${mensagem}`);
        return history.push(`/perfil-app/${id}`);
      } catch (error) {
        const { data: { mensagem } } = error.response;
        return toast.error(mensagem);
      }
    })();
  };

  return (
    <Section>
      <Container>
        <TitlePage title="Registrar novo App" />

        <DivForm>
          <form onSubmit={handleSubmit}>
            <div>
              <Information>
                todos os campos são preenchimento obrigatório
                <Required>*</Required>
              </Information>

              <div>
                <Input
                  onChange={({ target: { value } }) => setNome(value)}
                  size="large"
                  placeholder="Nome"
                  type="text"
                />
              </div>

              <div>
                <Input
                  onChange={
                  ({ target: { value } }) => setCodigoConstumizado(value)
                }
                  size="large"
                  placeholder="Código Constumizado"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit">
                  Criar
                </Button>
              </div>

            </div>
          </form>
        </DivForm>

      </Container>
    </Section>
  );
}

export default RegistrarApp;
