import styled from 'styled-components';

export const Information = styled.p`
  font-size: 12px;
  padding: 10px;
  text-align: center;

  span {
    color: red;
  }
`;

export const FormCustom = styled.form`
    flex: 3;
    flex-wrap: wrap;
    display: flex;
    max-width:500px;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 50px;
    flex-direction: column;

    div {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      flex-direction: column;
    }
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
