import React from 'react';
import Title from '../../components/Title';
import FormCompanyRelase from './components/Form';
import MenuOption from '../../components/MenuOption';

import {
  Section,
  Container,
} from './styles';

const RegisterEmpresaRevenda = () => (
  <Section>
    <MenuOption />
    <Container>
      <Title title="Cadastrar Empresa Revenda" />

      <FormCompanyRelase />
    </Container>
  </Section>
);

export default RegisterEmpresaRevenda;
