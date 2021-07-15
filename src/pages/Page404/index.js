import React, { useEffect } from 'react';
import history from '../../services/history';

function Page404() {
  useEffect(() => {
    history.push('/perfil');
  }, []);

  return (
    <h1>
      page404
    </h1>
  );
}

export default Page404;
