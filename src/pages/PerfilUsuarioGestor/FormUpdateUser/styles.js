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
  display: flex;
  flex-direction: column;
  justify-content: center;


  div {
    margin: 5px;
    display: flex;
    flex-direction: column;
  }
`;

export const Divbutton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
