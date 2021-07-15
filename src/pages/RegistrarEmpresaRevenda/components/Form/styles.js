import styled from 'styled-components';

export const Required = styled.span`
  color: red;
`;

export const Information = styled.p`
  font-size: 12px;
  padding: 10px;
  text-align: center;
`;

export const Form = styled.form`
    flex: 3;
    flex-wrap: wrap;
    display: flex;
    max-width:500px;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 50px;
    flex-direction: column;

    div {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      flex-direction: column;

      select {
        border: 1px solid #dddddd;
        padding: 10px;
        border-radius: 2px;
      }

      select:hover {
        border: 1px solid #274533;
        transition: 0.5s;
        cursor: pointer;
      }

      select:focus {
        border: 1px solid #274533;
        transition: 0.5s;
        cursor: pointer;
      }
    }
`;

export const DivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
