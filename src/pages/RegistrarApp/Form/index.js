import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { Information, FormCustom, DivButton } from './styles';
import { Input, Button } from '../../../styles/GenericStyles';

function Form() {
  const [$nome, setNome] = useState('');
  const [$codigoConstumizado, setCodigoConstumizado] = useState('');
  const [$path, setPath] = useState('');

  const handleCreateApp = (e) => {
    e.preventDefault();
    (async () => {
      if (!$nome || !$codigoConstumizado) {
        return toast.error('Preencha todos os campos!');
      }

      try {
        const { data: { mensagem, id } } = await axios.post('/apptype', {
          nome: $nome,
          codigo_constumizado: $codigoConstumizado,
          path: $path,
        });

        toast.success(`${mensagem}`);
        return history.push(`/perfil-app/${id}`);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;
          return toast.error(`${mensagem}`);
        }

        return toast.error('Por favor, entre em contato com a SoftVendas');
      }
    })();
  };
  return (
    <FormCustom onSubmit={handleCreateApp}>
      <div>
        <Information>
          todos os campos são preenchimento obrigatório
          <span>*</span>
        </Information>

        <div>
          <p>Nome</p>
          <Input
            onChange={({ target: { value } }) => setNome(value)}
            size="large"
            placeholder="nome"
            type="text"
          />
        </div>

        <div>
          <p>Código Constumizado</p>
          <Input
            onChange={
          ({ target: { value } }) => setCodigoConstumizado(value)
        }
            size="large"
            placeholder="código constumizado"
          />
        </div>

        <div>
          <p>Path</p>
          <Input
            onChange={
          ({ target: { value } }) => setPath(value)
        }
            size="large"
            placeholder="Path da API"
          />
        </div>
        <DivButton style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit">
            Criar
          </Button>
        </DivButton>

      </div>
    </FormCustom>
  );
}

export default Form;
