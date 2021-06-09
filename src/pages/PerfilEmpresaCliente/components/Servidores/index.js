import {
  Form, Input, Button, InputNumber, Select,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CloudSyncOutlined } from '@ant-design/icons';
import api from '../../../../services/axios';
import CollectionCreateForm from '../ModalNovaConfiguracao';

import { ContainerButton, ContainerInput, ContainerHeader } from './styles';

const { Option } = Select;

function ConfigurarServer({
  id,
}) {
  const [idConfig, setIdConfig] = useState(null);
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);
  const [datas, setDatas] = useState([]);
  const [$dns, setDns] = useState(null);
  const [$porta, setPorta] = useState(null);
  const [$host, setHost] = useState(null);
  const [$usuario, setUsuario] = useState(null);
  const [$senha, setSenha] = useState(null);
  const [$typeApp, setTypeApp] = useState(null);
  const [$nomeBanco, setNomeBanco] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/config-servidor/lista/${id}`);

        return setDatas(response.data);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;

          return toast.error(`${mensagem}`);
        }
        return toast.error('Por favor, entre em contato com a softvendas');
      }
    })();
  }, [reload]);

  const handleSelect = async (value) => {
    try {
      const response = await api.get(`/config-servidor/${value}`);

      const { banco_dados, dns, typeApp } = response.data;

      setTypeApp(typeApp);
      setDns(dns);
      setHost(banco_dados.host);
      setPorta(banco_dados.porta);
      setUsuario(banco_dados.usuario);
      setSenha(banco_dados.senha);
      setNomeBanco(banco_dados.nome_db);
      return setIdConfig(value);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.error('Por favor, entre em contato com a softvendas');
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { mensagem } } = await api.put(`/config-servidor/${idConfig}`, {
        host: $host,
        porta: $porta,
        usuario: $usuario,
        senha: $senha,
        dns: $dns,
        type_app: $typeApp,
        nome_db: $nomeBanco,
      });
      setReload(reload !== true);
      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.error('Por favor, entre em contato com a softvendas');
    }
  };

  const onCreate = async (values) => {
    try {
      const { data: { mensagem } } = await api.post(`config-servidor/${id}`, {
        type_app: values.type_app,
        dns: values.DNS,
        host: values.host,
        porta: values.porta,
        senha: values.senha,
        usuario: values.usuario,
        nome_db: values.nome_banco_dados,
      });

      setReload(reload !== true);
      setVisible(false);
      return toast.success(`${mensagem}`);
    } catch (error) {
      setVisible(false);
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }

      return toast.error('Por favor, entre em contato com a SoftVendas');
    }
  };

  const handleSync = async () => {
    try {
      const { data: { mensagem } } = await api.post(`/sicronizar-servidor/${idConfig}`);

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
    <>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <ContainerHeader>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Nova +
        </Button>

        <Select
          placeholder="Selecione um App"
          style={{ maxWidth: 200, width: '100%' }}
          onChange={handleSelect}
        >
          {datas.map((info) => (
            <Option key={info._id} value={info._id}>{info.typeApp}</Option>
          ))}
        </Select>
      </ContainerHeader>

      <Form
        style={{ maxWidth: '800px', width: '100%' }}
        name="control-hooks"
        onSubmitCapture={handleSubmit}
      >
        <ContainerInput>
          <label
            style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
            htmlFor="DNS"
          >
            <p>DNS</p>
            <Input
              type="text"
              id="DNS"
              value={$dns}
              onChange={({ target: { value } }) => setDns(value)}
            />
          </label>
          <label
            style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
            htmlFor="Host"
          >
            <p>Host</p>
            <Input
              type="text"
              id="host"
              value={$host}
              onChange={({ target: { value } }) => setHost(value)}
            />
          </label>
        </ContainerInput>

        <ContainerInput>
          <label
            style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
            htmlFor="usuario"
          >
            <p>Usuário</p>
            <Input
              type="text"
              id="usuario"
              value={$usuario}
              onChange={({ target: { value } }) => setUsuario(value)}
            />
          </label>

          <label
            style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
            htmlFor="Senha"
          >
            <p>Senha</p>
            <Input
              type="text"
              id="Senha"
              value={$senha}
              onChange={({ target: { value } }) => setSenha(value)}
            />
          </label>
        </ContainerInput>

        <ContainerInput>
          <label
            style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
            htmlFor="nome_banco_dados"
          >
            <p>Nome do banco de dados</p>
            <Input
              type="text"
              id="nome_banco_dados"
              value={$nomeBanco}
              onChange={({ target: { value } }) => setNomeBanco(value)}
            />
          </label>

          <label
            style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
            htmlFor="tipo_app"
          >
            <p>Tipo de App</p>
            <Input
              type="text"
              id="tipo_app"
              value={$typeApp}
              disabled
              onChange={({ target: { value } }) => setTypeApp(value)}
            />
          </label>

        </ContainerInput>

        <ContainerInput>
          <label
            style={{
              maxWidth: '250px', margin: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            }}
            htmlFor="porta"
          >
            Porta:
            <InputNumber
              style={{ maxWidth: '120px', width: '100%' }}
              id="porta"
              value={$porta}
              onChange={(value) => setPorta(value)}
            />
          </label>

        </ContainerInput>

        <ContainerButton>
          <Button
            style={{ maxWidth: '200px', width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            Salvar
          </Button>
          <Button
            style={{
              maxWidth: '200px',
              width: '100%',
              background: '#5b00ff',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
            type="primary"
            onClick={handleSync}
            htmlType="button"
          >
            sincronizar <CloudSyncOutlined style={{ fontSize: 18 }} />
          </Button>
        </ContainerButton>
      </Form>
    </>
  );
}

export default ConfigurarServer;
