import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, Switch,
} from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import TitlePage from '../../components/TitlePage';

import {
  Section, ContainerInput, ContainerButton, Container, ButtonUser,
} from './styles';
import api from '../../services/axios';

function PerfilEmpresaRevenda({ match }) {
  const [$cnpj, setCnpj] = useState('');
  const [$razaoSocial, setRazaoSocial] = useState('');
  const [$nomeFantasia, setNomeFantasia] = useState('');
  const [$active, setActive] = useState(false);
  const [$revenda, setRevenda] = useState(false);
  const { params: { id } } = match;

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

  const updateCompany = async () => {
    try {
      if (!cnpj.isValid($cnpj)) {
        return toast.error('CNPJ inválido');
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
    <Section>
      <Container>
        <TitlePage title="Edição Empresa Revenda" />
        <Form
          onSubmitCapture={updateCompany}
          style={{ maxWidth: '800px', width: '100%', flex: 2 }}
          name="form_company"
        >

          <ContainerInput>
            <label
              style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
              htmlFor="cnpj"
            >
              <p>CNPJ</p>
              <Input
                type="text"
                id="cnpj"
                value={cnpj.format($cnpj)}
                onChange={({ target: { value } }) => setCnpj(value)}
              />
            </label>
            <label style={{ maxWidth: '250px', margin: '5px' }} htmlFor="nome_fantasia">
              Nome Fantasia:
              <Input
                type="text"
                id="nome_fantasia"
                value={$nomeFantasia}
                onChange={({ target: { value } }) => setNomeFantasia(value)}
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
                value={$razaoSocial}
                onChange={({ target: { value } }) => setRazaoSocial(value)}
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
                checked={$active}
                onChange={(e) => setActive(e)}
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
              Revenda:
              <Switch
                style={{ width: 44 }}
                id="ativo"
                checked={$revenda}
                onChange={(e) => setRevenda(e)}
              />
            </label>

          </ContainerInput>

          <ContainerButton>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <Button
                style={{ maxWidth: '200px', width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                Salvar
              </Button>
            </div>

            <div style={{ flex: 1, textAlign: 'center' }}>
              <Link to={`/gerenciar-usuarios-gestores/${id}`}>
                <ButtonUser type="button">
                  Usuários
                </ButtonUser>
              </Link>
            </div>
          </ContainerButton>
        </Form>
      </Container>
    </Section>
  );
}

export default PerfilEmpresaRevenda;
