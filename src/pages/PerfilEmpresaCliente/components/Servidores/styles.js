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
  justify-content: center;
  display: flex;
`;

export const ContainerHeader = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  justify-content: space-around;
  padding: 20px;
`;
