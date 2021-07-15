import { CloudSyncOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Select } from '../../../../styles/GenericStyles';
import { Form, ButtonsFotter } from './styles';
import api from '../../../../services/axios';

function OptionsSelect({ id }) {
  const [servers, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/config-servidor/lista/${id}`);

        return setData(response.data);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;

          return toast.error(`${mensagem}`);
        }
        return toast.error('Por favor, entre em contato com a softvendas');
      }
    })();
  }, []);

  return (
    servers.map((value) => (
      <option key={value._id} value={value._id}>{value.typeApp}</option>
    ))
  );
}

function FormUpdateServer({ id }) {
  const [$dns, setDns] = useState('');
  const [$porta, setPorta] = useState('');
  const [$host, setHost] = useState('');
  const [$usuario, setUsuario] = useState('');
  const [$senha, setSenha] = useState('');
  const [$typeApp, setTypeApp] = useState('');
  const [$nomeBanco, setNomeBanco] = useState('');
  const [idConfig, setIdConfig] = useState('');

  const handleSelect = async (idServer) => {
    try {
      const response = await api.get(`/config-servidor/${idServer}`);

      const { banco_dados, dns, typeApp } = response.data;

      setTypeApp(typeApp);
      setDns(dns);
      setHost(banco_dados.host);
      setPorta(banco_dados.porta);
      setUsuario(banco_dados.usuario);
      setSenha(banco_dados.senha);
      setNomeBanco(banco_dados.nome_db);
      return setIdConfig(idServer);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.error('Por favor, entre em contato com a softvendas');
    }
  };

  const handleUpdateServer = async (e) => {
    e.preventDefault();
    if (
      $typeApp === ''
      || $dns === ''
      || $porta === ''
      || $host === ''
      || $usuario === ''
      || $nomeBanco === ''
      || idConfig === '') {
      return toast.error('Dados incompletos!');
    }
    try {
      const { data: { mensagem } } = await api.put(`/config-servidor/${idConfig}`, {
        host: $host,
        porta: $porta,
        usuario: $usuario,
        senha: $senha,
        dns: $dns,
        type_app: $typeApp,
        nome_db: $nomeBanco,
      });
      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.error('Por favor, entre em contato com a softvendas');
    }
  };

  const handleSync = async () => {
    try {
      if (idConfig === '') {
        return toast.error('Servidor não selecionado!');
      }
      const { data: { mensagem } } = await api.post(`/sicronizar-servidor/${idConfig}`);

      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;
        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  return (
    <Form onSubmitCapture={handleUpdateServer}>

      <Select
        defaultValue="DEFAULT"
        placeholder="Selecione um App"
        style={{ maxWidth: 200, width: '100%' }}
        onChange={({ target: { value } }) => handleSelect(value)}
      >
        <option value="DEFAULT" disabled>Selecione Servidor ...</option>
        <OptionsSelect id={id} />
      </Select>

      <div>
        <div>
          <p>DNS</p>
          <Input
            type="text"
            value={$dns}
            onChange={({ target: { value } }) => setDns(value)}
          />
        </div>

        <div>
          <p>Host</p>
          <Input
            type="text"
            value={$host}
            onChange={({ target: { value } }) => setHost(value)}
          />
        </div>
      </div>

      <div>
        <div>
          <p>Usuário</p>
          <Input
            type="text"
            value={$usuario}
            onChange={({ target: { value } }) => setUsuario(value)}
          />
        </div>

        <div>
          <p>Senha</p>
          <Input
            type="password"
            autoComplete="off"
            value={$senha}
            onChange={({ target: { value } }) => setSenha(value)}
          />
        </div>
      </div>

      <div>
        <div>
          <p>Nome do banco de dados</p>
          <Input
            type="text"
            value={$nomeBanco}
            onChange={({ target: { value } }) => setNomeBanco(value)}
          />
        </div>

        <div>
          <p>Tipo de App</p>
          <Input
            type="text"
            value={$typeApp}
            disabled
          />
        </div>

      </div>

      <div>
        <div>
          Porta
          <Input
            style={{ maxWidth: '120px', width: '100%' }}
            value={$porta}
            onChange={({ target: { value } }) => setPorta(value)}
          />
        </div>
      </div>

      <ButtonsFotter>
        <Button
          type="submit"
        >
          Salvar
        </Button>
        <Button
          color="#74B3CE"
          type="button"
          onClick={handleSync}
        >
          Sincronizar <CloudSyncOutlined style={{ fontSize: 18 }} />
        </Button>
      </ButtonsFotter>
    </Form>
  );
}

export default FormUpdateServer;
