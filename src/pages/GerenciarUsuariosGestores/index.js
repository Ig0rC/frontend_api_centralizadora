import { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import TitlePage from '../../components/TitlePage';
import axios from '../../services/axios';
import {
  Section,
  Container,
  DivNovo,
  ContainerOption,
} from './styles';

const { Search } = Input;

const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    width: 150,
  },
  {
    title: 'Usuário',
    dataIndex: 'usuario',
    width: 150,
  },
  {
    title: 'Administrador',
    width: 100,

    render: (value) => {
      const { master } = value;
      return (
        master === true ? <p>Sim</p> : <p>Não</p>
      );
    },
  },
  {
    title: 'Ativo',
    width: 100,

    render: (value) => {
      const { ativo } = value;
      return (
        ativo === true ? <p>Sim</p> : <p>Não</p>
      );
    },
  },
  {
    title: 'visualizar',
    fixed: 'right',
    width: 100,

    render: (value) => {
      const { _id } = value;
      return (
        <Link
          to={`/perfil-usuarios-gestores/${_id}`}
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

function GerenciarUsuariosGestores({ match }) {
  const [$data, setData] = useState([]);
  const [$loading, setLoading] = useState(false);
  const [$dataFilter, setDataFilter] = useState(null);
  const [$searchUser, setSearchUser] = useState('');
  const [$totalPage, setTotalPage] = useState(0);
  const [$pageSize, setPageSize] = useState(7);
  const { params: { id } } = match;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/usuario-admin/${id}`);
        setData(data);
        return setTotalPage(data.length);
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
      setLoading(true);
      const filterArray = $data.filter((value) => {
        const customSearchUser = $searchUser.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.usuario.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
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
        <TitlePage title="Usuários Gestores" />

        <ContainerOption>
          <div />
          <div>
            <Search
              style={{
                maxWidth: 500, flex: 1, width: '100%',
              }}
              enterButton="Buscar"
              size="large"
              loading={$loading}
              onChange={({ target: { value } }) => setSearchUser(value)}
            />
          </div>

          <DivNovo>
            <Link to={`/registrar-usuarios-gestores/${id}`}>
              <Button
                size="large"
                type="primary"
                color="dark"
                style={{ backgroundColor: '#274533', border: 'none' }}
              >
                <p style={{ display: 'flex' }}>
                  Novo <AddCircleOutlineIcon style={{ marginLeft: 2 }} />
                </p>
              </Button>
            </Link>
          </DivNovo>

        </ContainerOption>

        <Table
          style={{ width: '100%', padding: 10, color: 'black' }}
          columns={columns}
          dataSource={$dataFilter || $data}
          pagination={{ pageSize: $pageSize, total: $totalPage }}
          onChange={paginationCustom}
          rowKey="_id"
        />
      </Container>
    </Section>
  );
}

export default GerenciarUsuariosGestores;
