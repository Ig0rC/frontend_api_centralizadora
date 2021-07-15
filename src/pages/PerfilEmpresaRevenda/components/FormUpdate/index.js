import { cnpj } from 'cpf-cnpj-validator';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Input, Select, Button } from '../../../../styles/GenericStyles';
import api from '../../../../services/axios';
import { Form, Options, DivButton } from './styles';

function FormUpdate({ id }) {
  const [$cnpj, setCnpj] = useState('');
  const [$razaoSocial, setRazaoSocial] = useState('');
  const [$nomeFantasia, setNomeFantasia] = useState('');
  const [$active, setActive] = useState(false);
  const [$revenda, setRevenda] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/empresa-gestor/${id}`);
        setCnpj(data.cnpj_empresa);
        setRazaoSocial(data.razao_social);
        setNomeFantasia(data.nome_fantasia);
        setRevenda(data.revenda);
        setActive(data.ativo);
      } catch (error) {
        const { data: { errors } } = error.response;
        toast.error(`${errors}`);
      }
    })();
  }, []);

  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      if (!cnpj.isValid($cnpj)) {
        return toast.error('CNPJ inválido!');
      }

      const cnpjClear = $cnpj.replace(/\D/g, '');

      const { data: { mensagem } } = await api.put(`/empresa-gestor/${id}`, {
        cnpj_empresa: cnpjClear,
        nome_fantasia: $nomeFantasia,
        razao_social: $razaoSocial,
        ativo: $active,
        revenda: $revenda,
      });

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
    <Form
      onSubmitCapture={updateCompany}
      name="form_company"
    >
      <DivButton>
        <Link to={`/gerenciar-usuarios-gestores/${id}`}>
          Usuários
        </Link>
        <Link to={`/registrar-usuarios-gestores/${id}`}>
          Novo Usúario
        </Link>
      </DivButton>

      <div>
        <p>CNPJ</p>
        <Input
          type="text"
          id="cnpj"
          placeholder="CNPJ"
          value={cnpj.format($cnpj)}
          onChange={({ target: { value } }) => setCnpj(value)}
        />
      </div>

      <div>
        Nome Fantasia
        <Input
          type="text"
          id="nome_fantasia"
          placeholder="nome fantasia"
          value={$nomeFantasia}
          onChange={({ target: { value } }) => setNomeFantasia(value)}
        />
      </div>

      <div>
        <p>Razão Social </p>
        <Input
          type="text"
          id="razao_social"
          placeholder="razão social"
          value={$razaoSocial}
          onChange={({ target: { value } }) => setRazaoSocial(value)}
        />
      </div>

      <Options>
        <div>
          Revenda
          <Select
            name="isResale"
            value={$revenda}
            onChange={({ target: { value } }) => setRevenda(value)}
          >
            <option value>Sim</option>
            <option value={false}>Não</option>
          </Select>
        </div>

        <div>
          <p>Ativo </p>
          <Select
            value={$active}
            onChange={({ target: { value } }) => setActive(value)}
            name="isActive"

          >
            <option value>Sim</option>
            <option value={false}>Não</option>
          </Select>
        </div>
      </Options>

      <DivButton>
        <Button
          style={{ maxWidth: '200px', width: '100%' }}
          type="submit"
        >
          Salvar
        </Button>
      </DivButton>
    </Form>
  );
}

export default FormUpdate;
