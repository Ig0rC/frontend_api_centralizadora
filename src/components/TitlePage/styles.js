import styled from 'styled-components';

export const Header = styled.section`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  flex: 1;


  div {
    flex: 1;
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 439px){
      justify-content: center;
    }
  }

  img{
    height: 100px;
    padding: 10px;
    margin: 20px;
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
