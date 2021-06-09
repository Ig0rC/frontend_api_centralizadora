import React, { useEffect, useState } from 'react';
import {
  Input,
  Table,
} from 'antd';
import { Link } from 'react-router-dom';
import { FileSearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import {
  Section,
  Container,
  DivSearch,
} from './styles';
import TitlePage from '../../components/TitlePage';

const { Search } = Input;

const columns = [
  {
    title: 'Código App',
    dataIndex: 'codigo_app',
    width: 150,

  },
  {
    title: 'Usuário',
    dataIndex: 'usuario',
    width: 150,

  },
  {
    title: 'Acessos',
    dataIndex: 'acessos',
    width: 150,
  },
  {
    title: 'visualizar',
    fixed: 'right',
    width: 100,

    render: (value) => {
      const { _id } = value;
      return (
        <Link
          to={`/perfil-usuario/${_id}`}
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

function GerenciarUsuariosVendedores({ match }) {
  const { params: { id } } = match;

  const [$loading, setLoading] = useState(false);
  const [$searchUser, setSearchUser] = useState('');
  const [$pageSize, setPageSize] = useState(7);
  const [$totalPage, setTotalPage] = useState(0);
  const [$dataFilter, setDataFilter] = useState([]);
  const [$data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`/usuario-vendedor/${id}`);

        setData(data);

        setTotalPage(data.length);

        return setLoading(false);
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
    if ($searchUser !== '') {
      const filterArray = $data.filter((value) => {
        const customSearchUser = $searchUser
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.usuario.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
        );
      });

      setLoading(false);
      return setDataFilter(filterArray);
    }

    return setDataFilter(null);
  }, [$searchUser]);

  const paginationCustom = (pagination) => {
    const { pageSize } = pagination;
    setPageSize(pageSize);
  };

  return (
    <Section>
      <Container>

        <TitlePage title="Gerenciar Usuários Vendedores" />

        <DivSearch>

          <Search
            style={{
              maxWidth: '500px', padding: 10, width: '100%',
            }}
            loading={$loading}
            onChange={({ target: { value } }) => setSearchUser(value)}
            enterButton="Buscar"
            size="large"
          />

        </DivSearch>

        <Table
          style={{ width: '100%', padding: 10 }}
          columns={columns}
          loadgin={$loading}
          pagination={{ pageSize: $pageSize, total: $totalPage }}
          dataSource={$dataFilter || $data}
          onChange={paginationCustom}
          rowKey="_id"
        />

      </Container>
    </Section>
  );
}

export default GerenciarUsuariosVendedores;
