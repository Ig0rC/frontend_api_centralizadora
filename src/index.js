import React from 'react';
import ReactDOM from 'react-dom';
import Root from './routes/Root.routes';
import 'antd/dist/antd.css';
import 'reset-css';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
