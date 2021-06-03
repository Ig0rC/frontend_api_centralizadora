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
`;

export const ButtonUser = styled.button`
  max-width: 200px;
  width: 100%;
  font-weight: 400;
  border-radius: 2px;
  background-color: #274533;
  color: white !important;
  a {
    color: white;
  }
`;
