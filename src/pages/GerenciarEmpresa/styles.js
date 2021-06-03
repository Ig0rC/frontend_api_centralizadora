import styled from 'styled-components';

export const SectionBar = styled.section`
  flex: 1;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ContainerOption = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: center;
  flex-wrap: wrap-reverse;
  div {
    flex: 1;
    max-width: 100%;
  }

  @media(max-width: 800px) {
    div {
      margin: 10px;
    }
    justify-content: center;
    flex-direction: column-reverse;

  }
`;

export const DivNovo = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;

  button {
    padding: 8px;
    width: 81.40px;
    background-color: #20904e;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const Container = styled.div`
  flex: 1;
  max-width: 1700px;
  margin: 0 auto;
  margin: 10px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  background-color: white;
  flex-wrap: wrap;

  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;
