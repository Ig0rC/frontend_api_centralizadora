import React, { useEffect, useState } from 'react';
import {
  Modal, Form, Input, Select,
} from 'antd';
import { toast } from 'react-toastify';
import axios from '../../../../services/axios';

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [$data, setData] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/apptype');
        return setData(data);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;

          return toast.error(`${mensagem}`);
        }
        return toast.error('Por favor, entre em contato com a softvendas');
      }
    })();
  }, []);

  return (
    <Modal
      visible={visible}
      title="Criar Nova Configuração de App"
      okText="Criar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch(() => {
            toast.error('Preencha todos os campos');
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="cadastrar_app"
        initialValues={{
          modifier: 'public',
        }}
      >

        <Form.Item
          name="type_app"
          label="Tipo de App"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o nome do App do cliente',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecione o tipo de App"
            filterOption={
              (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            {$data.map((value) => (
              <Option key={value._id} value={value.codigo_constumizado}>
                {value.nome}
              </Option>
            ))}

          </Select>
        </Form.Item>

        <Form.Item
          name="DNS"
          label="DNS"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o DNS da máquina do cliente',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
          name="host"
          label="host"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o DNS da máquina do cliente',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="usuario"
          label="Usuário"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o usuário do banco de dados',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="senha"
          label="Senha"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o senha do banco de dados',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nome_banco_dados"
          label="Nome do banco de dados"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o nome do banco de banco de dados',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="porta"
          label="Porta"
          rules={[
            {
              required: true,
              message: 'Por favor, informe o DNS da máquina do cliente',
            },
          ]}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
