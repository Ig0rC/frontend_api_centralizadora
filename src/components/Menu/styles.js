import styled from 'styled-components';

export const MenuCustom = styled.div`
-webkit-box-shadow: -3px 3px 15px 7px rgba(0,0,0,0.5);
box-shadow: -3px 3px 15px 7px rgba(0,0,0,0.5);
  min-width: 80px;
  z-index: 2;
  height: 100%;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;
