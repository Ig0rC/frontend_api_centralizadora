import React from 'react';
import FormUpdate from './components/FormUpdate';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';

import {
  Section, Container,
} from './styles';

function PerfilEmpresaRevenda({ match }) {
  const { params: { id } } = match;

  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Edição Empresa Revenda" />

        <FormUpdate id={id} />
      </Container>
    </Section>
  );
}

export default PerfilEmpresaRevenda;
