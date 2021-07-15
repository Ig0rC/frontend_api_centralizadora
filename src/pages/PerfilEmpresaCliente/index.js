import React from 'react';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';
import {
  Section,
  Container,
} from './styled';
import ConfigurarServer from './components/Servidores';
import FormUpdateClient from './components/FormUpdateClient';

function CadastrarEmpresa({ match }) {
  const { params: { id } } = match;

  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Configuração do Cliente" />
        <FormUpdateClient id={id} />
      </Container>

      <Container>
        <Title icon="CloudUploadOutlined" title="Configurando Servidor" />
        <ConfigurarServer id={id} />
      </Container>
    </Section>
  );
}

export default CadastrarEmpresa;
