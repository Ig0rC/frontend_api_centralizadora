import styled from 'styled-components';

export const Input = styled.input`
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 2px;

  :hover {
    border: 1px solid #274533;
    transition: 0.5s;
  }

  :focus {
    border: 1px solid #274533;
    transition: 0.5s;
  }
`;

export const Button = styled.button`
    background-color: ${(props) => (props.color !== undefined ? props.color : '#274533')};
    border: none;
    border-radius: 2px;
    font-weight: 400;
    color: white;
    padding: 10px;
    max-width: 200px !important;
    width: 100% !important;
    font-size: 16px;

  :hover{
    filter: brightness(75%)
  }
`;

export const Select = styled.select`
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 2px;

  :hover {
    border: 1px solid #274533;
    transition: 0.5s;
    cursor: pointer;
  }

  :focus {
    border: 1px solid #274533;
    transition: 0.5s;
    cursor: pointer;
  }
`;
