import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cnpj } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Input, Button, Select } from '../../../../styles/GenericStyles';
import { Form, DivButton } from './styles';
import api from '../../../../services/axios';

function FormUpdateClient({ id }) {
  const [qtdLicenca, setQtdLicenca] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpjCliente, setCnpjCliente] = useState('');
  const [codigoEmpresa, setCodigoEmpresa] = useState('');
  const [active, setActive] = useState(false);
  const [codigoApp, setCodigoApp] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data: { cliente } } = await api.get(`/empresa-cliente/${id}`);
        setQtdLicenca(cliente.qtd_licenca);
        setRazaoSocial(cliente.razao_social);
        setNomeFantasia(cliente.nome_fantasia);
        setCnpjCliente(cliente.cnpj_cliente);
        setCodigoEmpresa(cliente.codigo_empresa);
        setActive(cliente.ativo);
        return setCodigoApp(cliente.codigo_app);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;
          return toast.error(`${mensagem}`);
        }
        return toast.error('Por favor, entre em contato com a SoftVendas');
      }
    })();
  }, []);

  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      if (!cnpj.isValid(cnpjCliente)) {
        return toast.error('CNPJ inválido');
      }

      const cnpjClear = cnpjCliente.replace(/\D/g, '');

      const { data: { mensagem } } = await api.put(`/empresa-cliente/${id}`, {
        cnpj_cliente: cnpjClear,
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        codigo_empresa: codigoEmpresa,
        qtd_licenca: qtdLicenca,
        ativo: active,
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
      style={{ maxWidth: '800px', width: '100%' }}
      name="form_company"
    >

      <div>
        <div>
          <p>Código App</p>
          <Input
            type="number"
            id="codigo_app"
            value={codigoApp}
            disabled
            style={{ color: 'black' }}
          />

        </div>

        <div>
          <p>CNPJ</p>
          <Input
            type="text"
            id="cnpj"
            value={cnpj.format(cnpjCliente)}
            onChange={({ target: { value } }) => setCnpjCliente(value)}
          />
        </div>
      </div>

      <div>
        <div>
          <p>Código empresa</p>
          <Input
            id="codigo_empresa"
            type="number"
            value={codigoEmpresa}
            onChange={({ target: { value } }) => setCodigoEmpresa(value)}
          />
        </div>

        <div>
          <p>Razão Social</p>
          <Input
            type="text"
            id="razao_social"
            value={razaoSocial}
            onChange={({ target: { value } }) => setRazaoSocial(value)}
          />
        </div>
      </div>

      <div>
        <div>
          <p>Nome Fantasia</p>
          <Input
            type="text"
            id="nome_fantasia"
            value={nomeFantasia}
            onChange={({ target: { value } }) => setNomeFantasia(value)}
          />
        </div>

        <div>
          <p>Quantidade de Licença</p>
          <Input
            id="qtd_licenca"
            type="number"
            value={qtdLicenca}
            onChange={({ target: { value } }) => setQtdLicenca(value)}
          />
        </div>
      </div>

      <div>
        <div>
          <p>Ativo</p>
          <Select
            id="ativo"
            value={active}
            onChange={({ target: { value } }) => setActive(value)}
          >
            <option value>Sim</option>
            <option value={false}>Não</option>
          </Select>
        </div>
      </div>

      <DivButton>
        <Link to={`/gerenciar-usuarios-vendedores/${id}`}>
          Vendedores
        </Link>

        <Button
          type="submit"
        >
          Salvar
        </Button>
      </DivButton>
    </Form>
  );
}

FormUpdateClient.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormUpdateClient;
