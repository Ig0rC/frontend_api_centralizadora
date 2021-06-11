import styled from 'styled-components';

export const Section = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  background-color: white;
  max-width: 1700px;
  max-height: 900px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  margin: 10px;
  overflow: auto;

  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;

export const ContainerOption = styled.div`
  display: flex;
  width: 100%;
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
    align-items: center;
  }
`;

export const DivNovo = styled.div`
  display: flex;
  justify-content: flex-end !important;


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
