import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Section,
  Container,
  Information,
  Required,
  DivForm,
  Button,
} from './styles';
import TitlePage from '../../components/TitlePage';
import axios from '../../services/axios';

function PerfilApp({ match }) {
  const [$nome, setNome] = useState('');
  const [$codigoConstumizado, setCodigoConstumizado] = useState('');
  const { params: { id } } = match;
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!$nome || !$codigoConstumizado) {
        return toast.error('Por favor, preencha todos campos');
      }

      const { data: { mensagem } } = await axios.put(`/apptype/${id}`, {
        nome: $nome,
        codigo_constumizado: $codigoConstumizado,
      });
      return toast.success(`${mensagem}`);
    } catch (error) {
      const { data: { mensagem } } = error.response;
      return toast.error(`${mensagem}`);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/apptype/${id}`);
      setNome(data.nome);
      setCodigoConstumizado(data.codigo_constumizado);
    })();
  }, []);

  return (
    <Section>
      <Container>
        <TitlePage title="Editar App" />
        <DivForm>
          <form onSubmit={handleUpdate}>
            <div>
              <Information>
                todos os campos são preenchimento obrigatório
                <Required>*</Required>
              </Information>

              <div>
                <Input
                  onChange={({ target: { value } }) => setNome(value)}
                  value={$nome}
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
                  value={$codigoConstumizado}
                  placeholder="Código Constumizado"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit">
                  salvar
                </Button>
              </div>

            </div>
          </form>
        </DivForm>
      </Container>
    </Section>
  );
}

export default PerfilApp;
