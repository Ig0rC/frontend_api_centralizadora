import React, { useEffect } from 'react';
import history from '../../services/history';

function Page404() {
  useEffect(() => {
    history.push('/gerenciar-empresas');
  }, []);

  return (
    <h1>
      page404
    </h1>
  );
}

export default Page404;
