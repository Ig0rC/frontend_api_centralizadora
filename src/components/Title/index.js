import { memo } from 'react';
import { Header } from './styles';

function Title(props) {
  return (
    <Header>
      <div>
        <h1>{props.title}</h1>
      </div>
    </Header>
  );
}

export default memo(Title);
