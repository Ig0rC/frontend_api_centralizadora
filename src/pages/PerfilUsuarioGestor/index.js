import PropTypes from 'prop-types';
import {
  Section,
  Container,
} from './styles';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';
import FormUpdateUser from './FormUpdateUser';

function PerfilUsuarioGestor({ match }) {
  const { params: { id } } = match;

  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Perfil Usuário Gestor" />
        <FormUpdateUser id={id} />
      </Container>
    </Section>
  );
}

PerfilUsuarioGestor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PerfilUsuarioGestor;
