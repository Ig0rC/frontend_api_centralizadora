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

export const Information = styled.p`
  font-size: 12px;
  padding: 10px;
  text-align: center;

  span {
    color: red;
  }
`;

export const DivForm = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  form {
    max-width: 500px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 100%;
      margin-bottom: 10px;

      input {
        width: 100%;
      }
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
