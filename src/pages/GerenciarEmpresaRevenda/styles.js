import styled from 'styled-components';

export const ContainerOption = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    flex: 1;
    max-width: 100%;
    margin: 5px;
  }

  @media(max-width: 900px){
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

export const DivNovo = styled.div`
  display: flex;
  justify-content: flex-end;


  button {
    margin-right: 10px;
    padding: 10px;
    width: 100px;
    background-color: #20904e;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
  }
`;

export const Container = styled.div`
  flex: 3;
  max-width: 1800px;
  width: 100%;
`;
