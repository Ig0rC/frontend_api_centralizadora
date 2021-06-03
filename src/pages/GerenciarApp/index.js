import { Table, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSearchOutlined } from '@ant-design/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { toast } from 'react-toastify';
import axios from '../../services/axios';
import {
  Section, Container, DivSearch,
} from './styles';
import TitlePage from '../../components/TitlePage';

const columns = [
  {
    title: 'Código App',
    dataIndex: 'codigo_constumizado',
    width: 150,

  },
  {
    title: 'Nome',
    dataIndex: 'nome',
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
          to={`/perfil-app/${_id}`}
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

const { Search } = Input;

function GerenciarApp() {
  const [$data, setData] = useState([]);
  const [$dataFilter, setDataFilter] = useState([]);
  const [$searchUser, setSearchUser] = useState('');
  const [$loading, setLoading] = useState(false);
  const [$pageSize, setPageSize] = useState(6);
  const [$totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/apptype');
        setTotalPage(data.length);
        return setData(data);
      } catch (error) {
        return toast.error('Por favor, entre em contato com a SoftVendas');
      }
    })();
  }, []);

  useEffect(() => {
    if ($searchUser !== '') {
      setLoading(true);

      const filterArray = $data.filter((value) => {
        const customSearchUser = $searchUser
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
            || value.codigo_constumizado.search(customSearchUser) > -1 ? value : ''
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
        <TitlePage title="Gerenciar App" />
        <DivSearch>

          <div />

          <div>
            <Search
              style={{
                maxWidth: 500, padding: 10, flex: 3, width: '100%',
              }}
              loading={$loading}
              onChange={({ target: { value } }) => setSearchUser(value)}
              enterButton="Buscar"
              size="large"
            />
          </div>

          <div>
            <Link to="/registrar-app">

              <Button
                size="large"
                type="primary"
                color="dark"
              >
                <p style={{ display: 'flex' }}>
                  Novo <AddCircleOutlineIcon style={{ marginLeft: 2 }} />
                </p>
              </Button>

            </Link>
          </div>

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

export default GerenciarApp;
