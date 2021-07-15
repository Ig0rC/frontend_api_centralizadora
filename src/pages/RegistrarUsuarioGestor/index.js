import {
  Section,
  Container,
} from './styles';
import Title from '../../components/Title';
import ManagerUserForm from './ManagerUserForm';
import Menu from '../../components/AdminUserMenu';

function RegistrarUsuarioGestor({ match }) {
  const { params: { id } } = match;

  return (
    <Section>
      <Menu />
      <Container>
        <Title title="Criar Usuário Gestor" />
        <ManagerUserForm id={id} />
      </Container>
    </Section>
  );
}

export default RegistrarUsuarioGestor;
