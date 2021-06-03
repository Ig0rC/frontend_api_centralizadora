import React, { useState } from 'react';
import { Input } from 'antd';
import { BankOutlined, FormOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';
import {
  SectionBar, ContainerForm, Button, Required, Information,
} from './styles';
import history from '../../services/history';

const RegisterEmpresaCliente = () => {
  const [$cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [fantasia, setFantasia] = useState('');
  const [cdEmpresa, setCdEmpresa] = useState('');
  const [licenca, setLicenca] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!cnpj || !razaoSocial || !fantasia || !cdEmpresa || !licenca) {
        return toast.error('Preencha todos campos');
      }

      const { data: { success, empresa } } = await axios.post('empresa-cliente', {
        cnpj_cliente: $cnpj,
        nome_fantasia: fantasia,
        revenda: true,
        razao_social: razaoSocial,
        codigo_empresa: cdEmpresa,
        qtd_licenca: licenca,
      });

      toast.success(`${success}`);
      return history.push(`/register/${empresa}`);
    } catch (error) {
      if (error.response) {
        const { status, data: { errors } } = error.response;

        if (status === 409) {
          return toast.error(`${errors}`);
        }

        if (status === 400) {
          return toast.error(`${errors}`);
        }
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  return (
    <>
      <SectionBar>

        <ContainerForm>
          <TitlePage title="Incluir Cliente App" />
          <form onSubmit={handleSubmit}>
            <div>
              <Information>
                todos os campos são preenchimento obrigatório
                <Required>*</Required>
              </Information>

              <div>
                <Input
                  onChange={({ target: { value } }) => setCnpj(value)}
                  value={cnpj.format($cnpj)}
                  size="large"
                  placeholder="CNPJ"
                  type="text"
                  prefix={<BankOutlined />}
                />
              </div>

              <div>
                <Input
                  onChange={({ target: { value } }) => setFantasia(value)}
                  size="large"
                  placeholder="nome Fantasia"
                  prefix={<FormOutlined />}
                />
              </div>

              <div>
                <Input
                  onChange={({ target: { value } }) => setRazaoSocial(value)}
                  size="large"
                  placeholder="razão Social"
                  prefix={<FormOutlined />}
                />
              </div>

              <div>
                <Input
                  onChange={({ target: { value } }) => setCdEmpresa(value)}
                  size="large"
                  placeholder="código da empresa do sistema"
                  type="number"
                  prefix={<FormOutlined />}
                />
              </div>
              <div>
                <Input
                  onChange={({ target: { value } }) => setLicenca(value)}
                  size="large"
                  placeholder="licenças"
                  type="number"
                  prefix={<UsergroupAddOutlined />}
                />
              </div>

              <Button type="submit">criar empresa</Button>
            </div>
          </form>
        </ContainerForm>
      </SectionBar>
    </>
  );
};

export default RegisterEmpresaCliente;
