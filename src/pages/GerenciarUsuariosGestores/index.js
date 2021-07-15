import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import MenuOption from '../../components/MenuOption';
import { Input } from '../../styles/GenericStyles';
import axios from '../../services/axios';
import {
  Section,
  Container,
  Search,
} from './styles';

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
      const filterArray = $data.filter((value) => {
        const customSearchUser = $searchUser.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.usuario.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
        );
      });

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
      <MenuOption />
      <Container>
        <Title title="Usuários Gestores" />

        <Search>
          <Input
            type="text"
            placeholder="Buscar..."
            onChange={({ target: { value } }) => setSearchUser(value)}
          />
        </Search>

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
