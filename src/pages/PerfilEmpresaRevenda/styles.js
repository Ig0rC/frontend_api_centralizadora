import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
`;

export const Container = styled.div`
  height: 100%;
  margin: 25px 15px 25px 15px !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  overflow: auto;
`;

export const DivButtonUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
