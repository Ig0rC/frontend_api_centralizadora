import {
  Section, Container,
} from './styles';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';
import Form from './Form';

function RegistrarApp() {
  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Registrar novo App" />

        <Form />
      </Container>
    </Section>
  );
}

export default RegistrarApp;
