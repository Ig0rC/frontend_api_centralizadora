import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';
import {
  Section,
  Container,
} from './styled';
import ConfigurarServer from './components/Servidores';
import FormUpdateClient from './components/FormUpdateClient';

function PerfilEmpresaCliente({ match }) {
  const { params: { id } } = match;

  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Configuração do cliente" />
        <FormUpdateClient id={id} />
      </Container>

      <Container>
        <Title title="Configuração do servidor" />
        <ConfigurarServer id={id} />
      </Container>
    </Section>
  );
}

PerfilEmpresaCliente.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PerfilEmpresaCliente;
