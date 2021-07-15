import React, { useState } from 'react';
import FormCreateServer from './FormCreateServer';
import FormUpdateServer from './FormUpdateServer';
import { Button } from '../../../../styles/GenericStyles';

import { ContainerHeader } from './styles';

function ConfigurarServer({
  id,
}) {
  const [newServer, setNewServer] = useState(false);
  const [serverId, setServerId] = useState('');

  const handleToggleCreateOrUpdate = (server) => {
    setServerId(server);
    setNewServer((prevState) => (prevState === false));
  };

  return (
    <>
      <ContainerHeader>
        <Button
          type="button"
          onClick={handleToggleCreateOrUpdate}
          color={newServer === true ? '#7a7a7a' : '#274533'}
        >
          {newServer === false ? 'Novo Servidor' : 'Voltar'}
        </Button>
      </ContainerHeader>
      {newServer === false ? (
        <FormUpdateServer serverId={serverId} id={id} />
      ) : (
        <FormCreateServer onToggleCreateOrUpdate={handleToggleCreateOrUpdate} id={id} />
      )}
    </>
  );
}

export default ConfigurarServer;
