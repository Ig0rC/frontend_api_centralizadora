import { memo } from 'react';
import PropTypes from 'prop-types';
import { Header } from './styles';

function Title({ title }) {
  return (
    <Header>
      <div>
        <h1>{title}</h1>
      </div>
    </Header>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(Title);
