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
        background-color: #274533 !important;
    }

    html, body, #root{
        height: 100% !important;
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
      background: white;
      border-radius: 10px;
    }
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 51px;
      margin: 2px;
    }
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
