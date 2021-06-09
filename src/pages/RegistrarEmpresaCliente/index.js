import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';
import {
  SectionBar, ContainerForm, Required, Information,
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

      const { data: { mensagem, empresa } } = await axios.post('empresa-cliente', {
        cnpj_cliente: $cnpj,
        nome_fantasia: fantasia,
        revenda: true,
        razao_social: razaoSocial,
        codigo_empresa: cdEmpresa,
        qtd_licenca: licenca,
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
    <>
      <SectionBar>

        <ContainerForm>
          <TitlePage title="Cadastrar Cliente" />
          <form onSubmit={handleSubmit}>
            <div>
              <Information>
                todos os campos são preenchimento obrigatório
                <Required>*</Required>
              </Information>

              <div>
                <p>CNPJ: </p>
                <Input
                  onChange={({ target: { value } }) => setCnpj(value)}
                  value={cnpj.format($cnpj)}
                  size="large"
                  placeholder="CNPJ"
                  type="text"
                />
              </div>

              <div>
                <p>Nome Fantasia: </p>
                <Input
                  onChange={({ target: { value } }) => setFantasia(value)}
                  size="large"
                  placeholder="nome Fantasia"
                />
              </div>

              <div>
                <p>Razão Social: </p>
                <Input
                  onChange={({ target: { value } }) => setRazaoSocial(value)}
                  size="large"
                  placeholder="razão Social"
                />
              </div>

              <div>
                <p>Código da empresa: </p>
                <Input
                  onChange={({ target: { value } }) => setCdEmpresa(value)}
                  size="large"
                  placeholder="código da empresa do sistema"
                  type="number"
                />
              </div>
              <div>
                <p>Quantidades de Licenças: </p>
                <Input
                  onChange={({ target: { value } }) => setLicenca(value)}
                  size="large"
                  placeholder="licenças"
                  type="number"
                />
              </div>

              <Button
                size="large"
                type="primary"
                htmlType="submit"
                color="dark"
                style={{
                  backgroundColor: '#274533', border: 'none', display: 'flex', justifyContent: 'center',
                }}
              >
                <p style={{ display: 'flex' }}>
                  Criar
                </p>
              </Button>
            </div>
          </form>
        </ContainerForm>
      </SectionBar>
    </>
  );
};

export default RegisterEmpresaCliente;
