import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Select } from '../../../../styles/GenericStyles';
import api from '../../../../services/axios';
import { Form, ButtonsFotter } from './styles';

function OptionsSelect() {
  const [appType, setAppType] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/apptype');

        return setAppType(data);
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
    appType.map((value) => (
      <option key={value._id} value={value.codigo_constumizado}>{value.nome}</option>
    ))
  );
}

function FormCreateServer({ id, onToggleCreateOrUpdate }) {
  const [$dns, setDns] = useState('');
  const [$porta, setPorta] = useState('');
  const [$host, setHost] = useState('');
  const [$usuario, setUsuario] = useState('');
  const [$senha, setSenha] = useState('');
  const [$typeApp, setTypeApp] = useState('');
  const [$nomeBanco, setNomeBanco] = useState('');

  const handleServerCreate = async (e) => {
    e.preventDefault();
    if (
      $typeApp === ''
      || $porta === ''
      || $host === ''
      || $usuario === ''
      || $senha === ''
      || $nomeBanco === ''
      || $dns === ''
    ) {
      return toast.error('Dados incompletos!');
    }
    try {
      const { data: { mensagem } } = await api.post(`config-servidor/${id}`, {
        type_app: $typeApp,
        dns: $dns,
        host: $host,
        porta: $porta,
        senha: $senha,
        usuario: $usuario,
        nome_db: $nomeBanco,
      });
      onToggleCreateOrUpdate();
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
    <Form onSubmitCapture={handleServerCreate}>

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
            type="text"
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
          <Select
            defaultValue="DEFAULT"
            placeholder="Selecione o tipo de App"
            onChange={({ target: { value } }) => setTypeApp(value)}
          >
            <option value="DEFAULT" disabled>Escolha o app ...</option>
            <OptionsSelect />
          </Select>
        </div>

      </div>

      <div>
        <div>
          Porta:
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
          Criar
        </Button>
      </ButtonsFotter>
    </Form>
  );
}

export default FormCreateServer;
