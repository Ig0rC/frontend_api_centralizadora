import {
  Form, Input, Button, InputNumber, Select,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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

        setDatas(response.data);
      } catch (error) {
        toast.error('Não foi possível carregar as configurações do usuário, por favor entre em contato com a softvendas');
      }
    })();
  }, [reload]);

  const handleSelect = async (value) => {
    const response = await api.get(`/config-servidor/${value}`);

    const { banco_dados, dns, typeApp } = response.data;

    setTypeApp(typeApp);
    setDns(dns);
    setHost(banco_dados.host);
    setPorta(banco_dados.porta);
    setUsuario(banco_dados.usuario);
    setSenha(banco_dados.senha);
    setNomeBanco(banco_dados.nome_db);
    setIdConfig(value);
  };

  const handleSubmit = async () => {
    try {
      const { data: { success } } = await api.put(`/config-servidor/${idConfig}`, {
        host: $host,
        porta: $porta,
        usuario: $usuario,
        senha: $senha,
        dns: $dns,
        type_app: $typeApp,
        nome_db: $nomeBanco,
      });
      setReload(reload !== true);
      return toast.success(`${success}`);
    } catch (error) {
      if (error.response) {
        const { data: { errors } } = error.response;

        return toast.error(`${errors}`);
      }
      return toast.error('Por favor, entre em contato com a softvendas');
    }
  };

  const onCreate = async (values) => {
    try {
      await api.post(`config-servidor/${id}`, {
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
      return toast.success('Criado com sucesso');
    } catch (error) {
      if (error.response) {
        const { data: { errors } } = error.response;

        setVisible(false);

        return toast.error(`${errors}`);
      }
      toast.error('Algo aconteceu, entre em contato com a softvendas');
    }
    return setVisible(false);
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
        </ContainerButton>
      </Form>
    </>
  );
}

export default ConfigurarServer;
