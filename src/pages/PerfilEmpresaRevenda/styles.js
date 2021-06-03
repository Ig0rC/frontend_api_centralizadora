import styled from 'styled-components';

export const Container = styled.div`

  background-color: white;
  max-width: 1280px;
  max-height: 800px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;

  padding: 20px !important;
  margin: 20px !important;


  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ececec;
  flex: 3;
  margin: 20px;
`;

export const ContainerInput = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 3;



  @media(max-width: 657px) {
    justify-content: center;
  }
`;

export const ContainerButton = styled.div`
  padding: 10px;
  justify-content: center;
  display: flex;
`;
