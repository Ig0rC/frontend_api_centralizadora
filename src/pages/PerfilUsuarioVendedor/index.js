import PropTypes from 'prop-types';
import {
  Section,
  Container,
} from './styles';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';
import FormUpdateSeller from './components/FormUpdateSeller';
import SellerDevices from './components/SellerDevices';

function PerfilUsuarioVendedor({ match }) {
  const { params: { id } } = match;

  return (
    <Section>
      <MenuOption />

      <Container>
        <Title title="Perfil do Usuário Vendedor" />
        <FormUpdateSeller id={id} />
      </Container>

      <Container>
        <Title title="Dispositivos" icon="PhoneOutlined" />
        <SellerDevices id={id} />
      </Container>
    </Section>
  );
}

PerfilUsuarioVendedor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PerfilUsuarioVendedor;
