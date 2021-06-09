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

export const Button = styled.button`
  padding: 20px;
  min-width: 300px;
  background-color:  #274533;
  color: white;
`;

export const ContainerForm = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 5px;
    flex: 3;
    display: flex;
    flex-direction: column;
`;
