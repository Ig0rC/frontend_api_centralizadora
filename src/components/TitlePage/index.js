import React from 'react';
import { CloudUploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { Header } from './styles';
import logo from '../../images/icone.png';

function TitlePage({ title, icon }) {
  let Icons;
  if (icon === 'CloudUploadOutlined') {
    Icons = CloudUploadOutlined;
  } else {
    Icons = UserAddOutlined;
  }

  return (
    <Header>
      <div>
        <h1>{title}</h1>
        {icon ? <Icons style={{ fontSize: '100px', color: '#274533' }} /> : <img src={logo} alt="" />}
      </div>
    </Header>
  );
}

export default TitlePage;
