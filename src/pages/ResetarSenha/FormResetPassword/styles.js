import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  max-width: 500px;
  width: 100%;
  margin: 20px;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    input, p {
      margin: 0px 10px 10px 10px !important;
    }
  }
`;
