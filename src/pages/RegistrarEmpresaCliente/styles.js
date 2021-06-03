import styled from 'styled-components';

export const SectionBar = styled.section`
  flex: 1;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Required = styled.span`
  color: red;
`;

export const Information = styled.p`
  font-size: 12px;
  padding: 10px;
  text-align: center;
`;

export const ContainerForm = styled.div`
  flex: 1;
  height: 80vh;
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

  form {
    flex: 3;
    flex-wrap: wrap;
    display: flex;
    max-width:500px;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 50px;
    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      div {
        margin-bottom: 10px;
      }
    }


  }
`;

export const TitleDiv = styled.div`
  flex: 1;
  padding: 5px;

  @media(max-width: 580px) {
    text-align: center;
  }

`;

export const Button = styled.button`
  padding: 20px;
  min-width: 300px;
  background-color:  #274533;
  color: white;
`;
