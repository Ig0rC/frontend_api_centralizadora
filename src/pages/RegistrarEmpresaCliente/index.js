import React from 'react';
import Title from '../../components/Title';
import Form from './components/Form';
import MenuOption from '../../components/MenuOption';

import {
  Container, Section,
} from './styles';

const RegisterClientCompany = () => (
  <Section>
    <MenuOption />
    <Container>
      <Title title="Cadastrar Empresa Cliente" />
      <Form />
    </Container>
  </Section>
);

export default RegisterClientCompany;
