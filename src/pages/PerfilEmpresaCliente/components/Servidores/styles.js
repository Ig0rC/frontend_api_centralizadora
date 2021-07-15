import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ececec;
  overflow: auto;
`;

export const ContainerInput = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;


  @media(max-width: 657px) {
    justify-content: center;

  }
`;

export const ContainerButton = styled.div`
  padding: 10px;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;

  button {
    margin: 5px;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  justify-content: space-around;
  padding: 20px;
`;

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

export const ButtonsFotter = styled.footer`
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;

  button {
    margin: 5px;
  }
`;
