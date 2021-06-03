import styled from 'styled-components';
import imageBG from '../../images/verde_claro.jpg';

export const Background = styled.div`
  background: url(${imageBG});
  width: 100vw;
`;

export const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
  align-items: center;
  background: white;
  justify-content: space-around;
  border-radius: 5px;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1.5;
`;

export const Input = styled.input`
  width: 250px;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid green;
`;

export const LogoS = styled.img`
  width: 300px;
`;

export const ContainerImage = styled.div`
  flex: 1;
`;

// BUTTON
export const ContainerButton = styled.div`
  flex:1;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Button = styled.button`
  width: 250px;
  height: 35px;
  border: none;
  background-color: #284734;
  color: white;
  font-size: 16px;
`;
