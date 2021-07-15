import { useState } from 'react';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import axios from '../../../../services/axios';
import history from '../../../../services/history';
import { Input, Button } from '../../../../styles/GenericStyles';

import { Information, Form, DivButton } from './styles';

function FormCompanyRegister() {
  const [$cnpj, setCnpj] = useState('');
  const [$razaoSocial, setRazaoSocial] = useState('');
  const [$fantasia, setFantasia] = useState('');
  const [$cdEmpresa, setCdEmpresa] = useState('');
  const [$licenca, setLicenca] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!cnpj.isValid($cnpj)) {
        return toast.error('CNPJ inválido!');
      }

      if (!$cnpj || !$razaoSocial || !$fantasia || !$cdEmpresa || !$licenca) {
        return toast.error('Preencha todos campos');
      }

      const cnpjClear = $cnpj.replace(/\D/g, '');

      const { data: { mensagem, empresa } } = await axios.post('empresa-cliente', {
        cnpj_cliente: cnpjClear,
        nome_fantasia: $fantasia,
        revenda: true,
        razao_social: $razaoSocial,
        codigo_empresa: $cdEmpresa,
        qtd_licenca: $licenca,
      });

      toast.success(`${mensagem}`);
      return history.push(`/register/${empresa}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;
        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Information>
        todos os campos são preenchimento obrigatório
        <span>*</span>
      </Information>

      <div>
        <p>CNPJ</p>
        <Input
          placeholder="CNPJ"
          onChange={({ target: { value } }) => setCnpj(value)}
          type="text"
          value={cnpj.format($cnpj)}
        />
      </div>

      <div>
        <p>Nome Fantasia</p>
        <Input
          placeholder="nome fantasia"
          onChange={({ target: { value } }) => setFantasia(value)}
          type="text"
        />
      </div>

      <div>
        <p>Razão Social</p>
        <Input
          placeholder="razão social"
          onChange={({ target: { value } }) => setRazaoSocial(value)}
          type="text"
        />
      </div>

      <div>
        <p>Código da Empresa</p>
        <Input
          placeholder="código da empresa"
          onChange={({ target: { value } }) => setCdEmpresa(value)}
          type="number"
        />
      </div>

      <div>
        <p>Quantidade de Licenças</p>
        <Input
          placeholder="quantidade de licenças"
          onChange={({ target: { value } }) => setLicenca(value)}
          type="number"
        />
      </div>

      <DivButton>
        <Button>
          Criar
        </Button>
      </DivButton>
    </Form>
  );
}

export default FormCompanyRegister;
