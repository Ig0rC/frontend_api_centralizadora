import styled from 'styled-components';

export const Section = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  max-height: 800px;
  height: 100%;
`;

export const Container = styled.div`
  flex: 1;
  max-width: 1700px;
  max-height: 800px;
  height: 100% ;
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
