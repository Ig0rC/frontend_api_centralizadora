import MenuOption from '../../components/MenuOption';
import Title from '../../components/Title';

import UserInfo from './UserInfo';
import FormResetPassword from './FormResetPassword';
import {
  Section, Container,
} from './styles';

function Perfil() {
  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Perfil" />
        <UserInfo />
        <Title title="Alterar Senha" />
        <FormResetPassword />
      </Container>
    </Section>
  );
}

export default Perfil;
