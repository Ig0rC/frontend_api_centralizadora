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
  max-height: 800px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;


  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;

export const Information = styled.p`
  font-size: 12px;
  padding: 10px;
  text-align: center;
`;

export const Required = styled.span`
  color: red;
`;

export const DivForm = styled.div`
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;

  form {
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const Button = styled.button`
  padding: 15px;
  max-width: 200px;
  width: 100%;
  font-size: 14px;
  background-color:  #274533;
  color: white;
`;
