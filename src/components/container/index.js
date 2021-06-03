import { Section, Container } from './styles';

const SectionBar = ({ children }) => (
  <Section>
    <Container>
      {children}
    </Container>
  </Section>
);

export default SectionBar;
