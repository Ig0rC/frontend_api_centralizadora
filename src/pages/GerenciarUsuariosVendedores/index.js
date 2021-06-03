import { useEffect } from 'react';
import axios from '../../services/axios';
import { Section, Container } from './styles';

function GerenciarUsuariosVendedores({ match }) {
  const { params: { id } } = match;
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/usuario-vendedor/${id}`);

      console.log(data);
    })();
  }, []);

  return (
    <Section>
      <Container />
    </Section>
  );
}

export default GerenciarUsuariosVendedores;
