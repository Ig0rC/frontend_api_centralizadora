import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  SectionBar, Container, ContainerOption, DivNovo,
} from './styles';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';

const { Search } = Input;

const columns = [
  {
    title: 'Cód. da Empresa',
    dataIndex: 'codigo_empresa',
    width: 150,

  },
  {
    title: 'CNPJ',
    dataIndex: 'cnpj_cliente',
    width: 150,
  },
  {
    title: 'Nome Fantasia',
    dataIndex: 'nome_fantasia',
    width: 400,
    key: 'nome_fantasia',
  },
  {
    title: 'Razão Social',
    dataIndex: 'razao_social',
    width: 400,
  },
  {
    title: 'Qtd. Licença',
    dataIndex: 'qtd_licenca',

  },
  {
    title: 'visualizar',
    fixed: 'right',
    width: 100,

    render: (value) => {
      const { _id } = value;
      return (
        <Link
          to={`/register/${_id}`}
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

const GerenciarEmpresa = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSizeNr, setPage] = useState(10);
  const [searchUser, setSearch] = useState('');
  const [dataFilter, setDataFilter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/empresa-cliente');

      setData(response.data);
      setTotalPage(response.data.length);
    })();
  }, []);

  useEffect(() => {
    if (searchUser !== '') {
      setLoading(true);

      const filterArray = data.filter((value) => {
        const customSearchUser = searchUser.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.nome_fantasia.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.razao_social.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.codigo_empresa.toLowerCase().search(searchUser) > -1
          || value.cnpj_cliente.search(searchUser) > -1 ? value : ''
        );
      });

      setLoading(false);
      return setDataFilter(filterArray);
    }
    return setDataFilter(null);
  }, [searchUser]);

  const paginationCustom = (pagination) => {
    const { pageSize } = pagination;
    setPage(pageSize);
  };

  return (
    <SectionBar>
      <Container>
        <TitlePage title="Empresas Clientes" />

        <ContainerOption>
          <div />
          <div>
            <Search
              style={{
                maxWidth: 1500, padding: 10, flex: 3, width: '100%',
              }}
              enterButton="Buscar"
              size="large"
              loading={loading}
              onChange={({ target: { value } }) => setSearch(value)}
            />
          </div>

          <DivNovo>
            <Link to="/register-empresa-cliente">
              <button type="submit">
                Novo <AddCircleOutlineIcon />
              </button>
            </Link>
          </DivNovo>

        </ContainerOption>

        <Table
          style={{ width: '100%', padding: 10 }}
          columns={columns}
          loading={loading}
          dataSource={dataFilter || data}
          pagination={{ pageSize: pageSizeNr, total: totalPage }}
          onChange={paginationCustom}
          rowKey="_id"
        />

      </Container>

    </SectionBar>
  );
};

export default GerenciarEmpresa;