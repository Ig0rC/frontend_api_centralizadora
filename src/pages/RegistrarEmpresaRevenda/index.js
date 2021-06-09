import React, { useState } from 'react';
import { Input, Switch, Button } from 'antd';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';
import {
  SectionBar,
  ContainerForm,
  Required,
  Information, DivSwitch,
} from './styles';
import history from '../../services/history';

const RegisterEmpresaRevenda = () => {
  const [$cnpj, setCnpj] = useState('');
  const [$razaoSocial, setRazaoSocial] = useState('');
  const [$nomeFantasia, setNomeFantasia] = useState('');
  const [$revenda, setRevenda] = useState(true);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!cnpj.isValid($cnpj)) {
        return toast.error('CNPJ inválido');
      }

      if (!$cnpj || !$razaoSocial || !$nomeFantasia) {
        return toast.error('Preencha todos campos');
      }

      const { data: { mensagem, empresa } } = await axios.post('empresa-gestor', {
        cnpj_empresa: $cnpj,
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

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  const handleChangeRevenda = (value) => {
    setRevenda(value);
  };

  return (
    <>
      <SectionBar>

        <ContainerForm>
          <TitlePage title="Registrar Empresa Revenda" />
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
                  onChange={({ target: { value } }) => setNomeFantasia(value)}
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

              <DivSwitch>
                <p>Revenda: </p>
                <Switch
                  style={{ width: 20 }}
                  defaultChecked
                  onChange={handleChangeRevenda}
                />
              </DivSwitch>

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

export default RegisterEmpresaRevenda;
