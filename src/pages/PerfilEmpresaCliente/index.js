import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, Switch, InputNumber,
} from 'antd';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import SectionBar from '../../components/container';
import TitlePage from '../../components/TitlePage';
import {
  Section, ContainerInput, ContainerButton, ButtonUser,
} from './styled';
import api from '../../services/axios';
import ConfigurarServer from './components/Servidores';

function CadastrarEmpresa({ match }) {
  const [qtdLicenca, setQtdLicenca] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpjCliente, setCnpjCliente] = useState('');
  const [codigoEmpresa, setCodigoEmpresa] = useState('');
  const [dataConfigServer, setDataConfigServer] = useState();
  const [active, setActive] = useState(false);
  const [codigoApp, setCodigoApp] = useState('');
  const { params: { id } } = match;

  useEffect(() => {
    (async () => {
      const { data: { cliente, configServer } } = await api.get(`/empresa-cliente/${id}`);
      setQtdLicenca(cliente.qtd_licenca);
      setRazaoSocial(cliente.razao_social);
      setNomeFantasia(cliente.nome_fantasia);
      setCnpjCliente(cliente.cnpj_cliente);
      setCodigoEmpresa(cliente.codigo_empresa);
      setActive(cliente.ativo);
      setDataConfigServer(configServer);
      setCodigoApp(cliente.codigo_app);
    })();
  }, []);

  const updateCompany = async () => {
    try {
      const { data: { success } } = await api.put(`/empresa-cliente/${id}`, {
        cnpj_cliente: cnpjCliente,
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        codigo_empresa: codigoEmpresa,
        qtd_licenca: qtdLicenca,
        ativo: active,
      });

      toast.success(`${success}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Section>
      <SectionBar>
        <TitlePage title="Edição Cliente App" />
        <Form
          onSubmitCapture={updateCompany}
          style={{ maxWidth: '800px', width: '100%' }}
          name="form_company"
        >

          <ContainerInput>
            <label
              style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
              htmlFor="cnpj"
            >
              <p>CNPJ {codigoApp}</p>
              <Input
                type="number"
                id="cnpj"
                value={cnpjCliente}
                onChange={({ target: { value } }) => setCnpjCliente(value)}
              />
            </label>
            <label
              style={{ maxWidth: '250px', margin: '5px' }}
              htmlFor="codigo_empresa"
            >
              Código empresa:
              <InputNumber
                style={{ maxWidth: '250px', width: '100%' }}
                id="codigo_empresa"
                value={codigoEmpresa}
                onChange={(value) => setCodigoEmpresa(value)}
              />
            </label>
          </ContainerInput>

          <ContainerInput>
            <label
              style={{ maxWidth: '250px', margin: '5px' }}
              htmlFor="razao_social"
            >
              Razão Social:
              <Input
                type="text"
                id="razao_social"
                value={razaoSocial}
                onChange={({ target: { value } }) => setRazaoSocial(value)}
              />
            </label>
            <label style={{ maxWidth: '250px', margin: '5px' }} htmlFor="nome_fantasia">
              Nome Fantasia:
              <Input
                type="text"
                id="nome_fantasia"
                value={nomeFantasia}
                onChange={({ target: { value } }) => setNomeFantasia(value)}
              />
            </label>
          </ContainerInput>

          <ContainerInput>
            <label
              style={{ maxWidth: '250px', margin: '5px' }}
              htmlFor="qtd_licenca"
            >
              Quantidade de Licença:
              <InputNumber
                style={{ maxWidth: '103px', width: '100%' }}
                id="qtd_licenca"
                value={qtdLicenca}
                onChange={(value) => setQtdLicenca(value)}

              />
            </label>

          </ContainerInput>

          <ContainerInput>
            <label
              style={{
                maxWidth: '250px', margin: '5px', display: 'flex', flexDirection: 'column',
              }}
              htmlFor="ativo"
            >
              Ativo:
              <Switch
                id="ativo"
                checked={active}
                onChange={(e) => setActive(e)}
              />
            </label>
          </ContainerInput>

          <ContainerButton>
            <ButtonUser
              type="button"
            >
              <Link to={`/gerenciar-usuarios/${id}`}>

                Usuários Vendedor
              </Link>
            </ButtonUser>

            <Button
              style={{ maxWidth: '200px', width: '100%' }}
              type="primary"
              htmlType="submit"
            >
              Salvar
            </Button>
          </ContainerButton>
        </Form>

      </SectionBar>

      <SectionBar>
        <TitlePage icon="CloudUploadOutlined" title="Configurando App" />
        <ConfigurarServer id={id} data={dataConfigServer} />
      </SectionBar>
    </Section>
  );
}

export default CadastrarEmpresa;
