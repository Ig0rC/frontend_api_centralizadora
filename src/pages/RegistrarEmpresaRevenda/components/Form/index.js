import { useState } from 'react';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import axios from '../../../../services/axios';
import history from '../../../../services/history';

import {
  Information, Required, Form, DivButton,
} from './styles';
import { Input, Button } from '../../../../styles/GenericStyles';

function FormCompanyRelase() {
  const [$cnpj, setCnpj] = useState('');
  const [$razaoSocial, setRazaoSocial] = useState('');
  const [$nomeFantasia, setNomeFantasia] = useState('');
  const [$revenda, setRevenda] = useState(true);

  const handleCreateCompany = async (e) => {
    try {
      e.preventDefault();

      if (!cnpj.isValid($cnpj)) {
        return toast.error('CNPJ é inválido!');
      }

      if (!$cnpj || !$razaoSocial || !$nomeFantasia) {
        return toast.error('Preencha todos campos!');
      }
      const cnpjClear = $cnpj.replace(/\D/g, '');

      const { data: { mensagem, empresa } } = await axios.post('empresa-gestor', {
        cnpj_empresa: cnpjClear,
        nome_fantasia: $nomeFantasia,
        razao_social: $razaoSocial,
        revenda: $revenda,
      });

      toast.success(`${mensagem}`);
      return history.push(`/perfil-empresa-revenda/${empresa}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;
        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas!aqui');
    }
  };

  return (
    <Form onSubmit={handleCreateCompany}>
      <Information>
        todos os campos são preenchimento obrigatório
        <Required>*</Required>
      </Information>

      <div>
        <p>CNPJ</p>
        <Input
          onChange={({ target: { value } }) => setCnpj(value)}
          value={cnpj.format($cnpj)}
          placeholder="CNPJ"
          type="text"
        />
      </div>

      <div>
        <p>Nome Fantasia</p>
        <Input
          onChange={({ target: { value } }) => setNomeFantasia(value)}
          placeholder="nome fantasia"
        />
      </div>

      <div>
        <p>Razão Social</p>
        <Input
          onChange={({ target: { value } }) => setRazaoSocial(value)}
          placeholder="razão social"
        />
      </div>

      <div>
        <p>Revenda</p>
        <select
          value={$revenda}
          onChange={({ target: { value } }) => setRevenda(value)}
          name="revenda"
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </select>
      </div>

      <DivButton>
        <Button type="submit">
          Criar
        </Button>
      </DivButton>
    </Form>
  );
}

export default FormCompanyRelase;
