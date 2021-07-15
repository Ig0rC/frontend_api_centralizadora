import styled from 'styled-components';

export const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;



  div {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 555px){
      flex-direction: column-reverse;
      justify-content: center;
      text-align: center;
    }
  }

  h1 {
    font-size: 24px;
    color: #274533;
    margin: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 17px;
  font-weight: 500;
  color: white;
`;
