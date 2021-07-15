import styled from 'styled-components';

export const Form = styled.form`
  max-width: 500px;
  width: 100%;
  flex: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 5px;


  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 5px !important;
  }

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
    margin-bottom: 10px;

    :hover{
      filter: brightness(75%)
    }
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    margin: 0px !important;
    width: 35%;
  }
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
