import { Table } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { cnpj } from 'cpf-cnpj-validator';
import axios from '../../services/axios';
import {
  Container, Section, Search,
} from './styles';
import MenuOption from '../../components/MenuOption';
import { Input } from '../../styles/GenericStyles';
import Title from '../../components/Title';

const columns = [
  {
    title: 'CNPJ',
    width: 300,
    render: (value) => {
      const { cnpj_empresa } = value;
      return (
        <p>{cnpj.format(cnpj_empresa)}</p>
      );
    },
  },
  {
    title: 'Nome Fantasia',
    dataIndex: 'nome_fantasia',
    width: 300,
    key: 'nome_fantasia',
  },
  {
    title: 'Razão Social',
    dataIndex: 'razao_social',
    width: 300,
  },
  {
    title: 'visualizar',
    fixed: 'right',
    width: 100,

    render: (value) => {
      const { _id } = value;
      return (
        <Link
          to={`/perfil-empresa-revenda/${_id}`}
        >
          <FileSearchOutlined
            style={{
              cursor: 'pointer', textAlign: 'center', fontSize: '19px', color: '#08c',
            }}
          />
        </Link>
      );
    },
  },
];

function GerenciarEmpresaRevenda() {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [pageSizeNr, setPage] = useState(7);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/empresa-gestor');

        setData(response.data);
        return setTotalPage(response.data.length);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;

          return toast.error(`${mensagem}`);
        }
        return toast.error('Por favor, entre em contato com a softvendas');
      }
    })();
  }, []);

  useEffect(() => {
    if (searchUser !== '') {
      const filterArray = data.filter((value) => {
        const customSearchUser = searchUser.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.nome_fantasia.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.razao_social.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.cnpj_empresa.search(searchUser) > -1 ? value : ''
        );
      });

      return setDataFilter(filterArray);
    }
    return setDataFilter(null);
  }, [searchUser]);

  const paginationCustom = (pagination) => {
    const { pageSize } = pagination;
    setPage(pageSize);
  };

  return (
    <Section>
      <MenuOption />
      <Container>
        <Title title="Empresas Revendas" />

        <Search>
          <Input
            type="text"
            onChange={({ target: { value } }) => setSearchUser(value)}
            placeholder="Buscar..."
          />
        </Search>

        <Table
          style={{ width: '100%', padding: 10, flexGrow: 1 }}
          columns={columns}
          dataSource={dataFilter || data}
          pagination={{ pageSize: pageSizeNr, total: totalPage }}
          onChange={paginationCustom}
          rowKey="_id"
        />
      </Container>
    </Section>
  );
}

export default GerenciarEmpresaRevenda;
