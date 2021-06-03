import { Table, Input, Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SectionBar from '../../components/container';
import axios from '../../services/axios';
import { ContainerOption, DivNovo, Container } from './styles';
import TitlePage from '../../components/TitlePage';

const { Search } = Input;

const columns = [
  {
    title: 'CNPJ',
    dataIndex: 'cnpj_empresa',
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
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  const [totalPage, setTotalPage] = useState(0);
  const [pageSizeNr, setPage] = useState(7);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/empresa-gestor');

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
          || value.cnpj_empresa.search(searchUser) > -1 ? value : ''
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
      <TitlePage title="Empresas Revendas" />

      <Container>
        <ContainerOption>
          <div />
          <div>
            <Search
              style={{
                maxWidth: 500, flex: 1, width: '100%',
              }}
              enterButton="Buscar"
              size="large"
              loading={loading}
              onChange={({ target: { value } }) => setSearchUser(value)}
            />
          </div>

          <DivNovo>
            <Link to="/registrar-empresa-revenda">
              <Button type="primary">
                Novo <AddCircleOutlineIcon />
              </Button>
            </Link>
          </DivNovo>

        </ContainerOption>
        <Table
          style={{ width: '100%', padding: 10 }}
          columns={columns}
          dataSource={dataFilter || data}
          pagination={{ pageSize: pageSizeNr, total: totalPage }}
          onChange={paginationCustom}
          rowKey="_id"
        />
      </Container>
    </SectionBar>
  );
}

export default GerenciarEmpresaRevenda;
