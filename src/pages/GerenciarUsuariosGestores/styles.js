import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
`;

export const Container = styled.div`
  margin: 25px 15px 25px 15px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  overflow: auto;
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

export const Search = styled.div`
  flex-basis: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

    input {
      flex-basis: 300px;
    }

    @media(max-width: 330px){
      input {
        flex-basis: 200px;
      }
    }
`;
