import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
    }

    html, body, #root{
        height: 100%;
    }

    button {
        cursor: pointer;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        transition: all 300ms;

    }

    button:hover{
        filter: brightness(75%)
    }

    a {
        cursor: pointer;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background: #0197F6;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background: #F2AF29;
    }

    ::-webkit-scrollbar-thumb {
    background: #274533;
    border-radius: 10px;
    }
    /* width */
    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
      margin: 2px;
    }
`;

export const Container = styled.section`
  display: flex;
  height: 100vh;
  width: 100vw;

`;
