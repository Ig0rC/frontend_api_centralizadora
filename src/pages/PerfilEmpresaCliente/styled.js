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

export const ButtonUser = styled.button`
  font-weight: 400;
  border-radius: 2px;
  background-color: #274533;
  color: white !important;
  width: 200px;
  height: 32px;
  a {
    max-width: 200px !important;
    width: 100% !important;
    color: white;
  }
`;
