import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '../../styles/GenericStyles';
import MenuOption from '../../components/MenuOption';
import {
  Section,
  Container,
  Information,
  DivForm,
  Button,
} from './styles';
import Title from '../../components/Title';
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
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.error('Por favor, entre em contato com a softvendas');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/apptype/${id}`);
        setNome(data.nome);
        return setCodigoConstumizado(data.codigo_constumizado);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;

          return toast.error(`${mensagem}`);
        }
        return toast.error('Por favor, entre em contato com a softvendas');
      }
    })();
  }, []);

  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Editar App" />
        <DivForm>
          <form onSubmit={handleUpdate}>
            <div>
              <Information>
                todos os campos são preenchimento obrigatório
                <span>*</span>
              </Information>

              <div>
                <p>Nome App</p>
                <Input
                  onChange={({ target: { value } }) => setNome(value)}
                  value={$nome}
                  placeholder="nome app"
                  type="text"
                />
              </div>

              <div>
                <p>Código Constumizado</p>
                <Input
                  onChange={
                  ({ target: { value } }) => setCodigoConstumizado(value)
                  }
                  value={$codigoConstumizado}
                  placeholder="código constumizado"
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
