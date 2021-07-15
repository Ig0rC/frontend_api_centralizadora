import styled from 'styled-components';

export const Form = styled.form`
  flex: 1;
  max-width: 800px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  a {
    background-color: #09BC8A;
    border: none;
    border-radius: 2px;
    font-weight: 500;
    color: white;
    padding: 10px;
    max-width: 200px !important;
    width: 100% !important;
    font-size: 16px;
    text-align: center;

    :hover{
      filter: brightness(75%)
    }
  }

  div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    div {
      display: flex;
      flex-direction: column;
      margin: 10px;
      flex: 1px;
      justify-content: space-between;
    }
  }
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: space-around;

  a {
    margin-bottom: 5px;
  }

  button {
    margin-bottom: 5px;
  }
`;
