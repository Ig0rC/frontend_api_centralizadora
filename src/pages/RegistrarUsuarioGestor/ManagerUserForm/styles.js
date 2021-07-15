import styled from 'styled-components';

export const Information = styled.p`
  font-size: 12px;
  padding: 10px;
  text-align: center;

  span {
    color: red;
  }
`;

export const Form = styled.form`
  flex: 1;
  max-width: 500px;
  width: 100%;
  //flex
  display: flex;
  justify-content: center;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    margin: 5px;
  }
`;

export const DivButton = styled.div`
  justify-content: center;
  align-items: center;
`;
