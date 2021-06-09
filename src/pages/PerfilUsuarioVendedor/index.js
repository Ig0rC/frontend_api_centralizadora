import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Form, Input, Button, Switch,
} from 'antd';
import {
  Section,
  Container,
  ContainerButton,
  ContainerDispositivos,
  Dispositivos,
  DispositivosInformacao,
  DispositivoIcon,
  ButtonHandleAtivo,
  SpanCustom,
} from './styles';
import TitlePage from '../../components/TitlePage';
import axios from '../../services/axios';
import iphone from '../../images/iphone.png';

const { Search } = Input;

function PerfilUsuarioVendedor({ match }) {
  const [$acessos, setAcessos] = useState(0);
  const [$usuario, setUsuario] = useState(0);
  const [$ativo, setAtivo] = useState(0);
  const [$dispositivos, setDispositivos] = useState([]);
  const [$searchUser, setSearchUser] = useState('');
  const [$serchDispositivos, setSearchDispositivo] = useState([]);
  const [$clear, setClear] = useState(true);
  const [$reset, setReset] = useState(false);
  const { params: { id } } = match;

  useEffect(() => {
    (async () => {
      try {
        const { data: { user, dispositivos } } = await axios
          .get(`/usuario-vendedor/buscar/${id}`);

        setAcessos(user.acessos);
        setUsuario(user.usuario);
        setDispositivos(dispositivos);
        return setAtivo(user.ativo);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;
          return toast.error(`${mensagem}`);
        }

        return toast.error('Por favor, entre em contato com a SoftVendas');
      }
    })();
  }, []);

  const updateUser = async () => {
    try {
      const { data: { mensagem } } = await axios.put(`/usuario-vendedor/${id}`, {
        acessos: $acessos,
        ativo: $ativo,
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

  const handleCheck = (checked) => {
    setAtivo(checked);
    toast.success(`Usuário ${checked === true ? 'ativado' : 'desativado'}`);
  };

  const desativarDisposito = async ({ idDispositivo }) => {
    try {
      const { data: { mensagem } } = await axios.put(`/dispositivo-vendedor/${idDispositivo}`);

      if ($reset === true) {
        setReset(false);
      }

      if ($reset === false) {
        setReset(true);
      }

      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.success('Por favor, entre em contato com a SoftVendas');
    }
  };

  useEffect(() => {
    if ($clear) {
      setSearchDispositivo($dispositivos);
    }
    if ($searchUser !== '') {
      const filterArray = $dispositivos.filter((value) => {
        const customSearchUser = $searchUser.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.modelo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
        );
      });
      setClear(false);
      return setDispositivos(filterArray);
    }
    setClear(true);
    return setDispositivos($serchDispositivos);
  }, [$searchUser]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/dispositivo-vendedor/${id}`);

      setDispositivos(data);
    })();
  }, [$reset]);

  return (
    <Section>
      <Container>
        <TitlePage title="Perfil Usuário Vendedor" />
        <div style={{
          display: 'flex', justifyContent: 'center', margin: '10px', flex: '3',
        }}
        >
          <Form
            onSubmitCapture={updateUser}
            style={{ maxWidth: '800px', width: '100%', flex: 2 }}
            name="form_company"
          >

            <label
              style={{ maxWidth: '250px', margin: '5px', width: '100%' }}
              htmlFor="usuario"
            >
              <p>Usuário</p>
              <Input
                type="text"
                id="usuario"
                value={$usuario}
                disabled
                onChange={({ target: { value } }) => setUsuario(value)}
              />
            </label>
            <label
              style={{ maxWidth: '250px', margin: '5px' }}
              htmlFor="acessos"
            >
              Acessos:
              <Input
                type="number"
                id="nome_fantasia"
                value={$acessos}
                onChange={({ target: { value } }) => setAcessos(value)}
              />
            </label>

            <label
              style={{ maxWidth: '250px', margin: '5px' }}
              htmlFor="ativo"
            >
              Ativo:
              <br />
              <Switch
                checked={$ativo}
                onChange={handleCheck}
                style={{ maxWidth: 50, width: '100%' }}
              />
            </label>

            <ContainerButton>
              <Button
                style={{ maxWidth: '500px', width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                Salvar
              </Button>
            </ContainerButton>
          </Form>

        </div>
      </Container>

      <Container>
        <TitlePage title="Dispositivos" icon="PhoneOutlined" />
        <Search
          style={{
            maxWidth: 500, flex: 1, width: '100%',
          }}
          enterButton="Buscar"
          size="large"
          onChange={({ target: { value } }) => setSearchUser(value)}
        />
        <ContainerDispositivos>
          {$dispositivos.map((value) => (
            <Dispositivos key={value._id}>
              <DispositivoIcon>
                <img src={`${iphone}`} alt="iphone" />
              </DispositivoIcon>
              <DispositivosInformacao>
                <div>
                  <p>id:
                    <SpanCustom colorCustom={value.ativo}>
                      {value.id_dispositivo}
                    </SpanCustom>
                  </p>
                  <p>modelo:
                    <SpanCustom colorCustom={value.ativo}>
                      {value.modelo}
                    </SpanCustom>
                  </p>
                  <p>situação:
                    <SpanCustom colorCustom={value.ativo}>
                      {value.ativo === true ? 'ativo' : 'desativado'}
                    </SpanCustom>
                  </p>
                </div>
                <div style={{
                  flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                }}
                >
                  <ButtonHandleAtivo
                    onClick={() => desativarDisposito({ idDispositivo: value._id })}
                    colorCustom={value.ativo}
                    type="button"
                  >
                    {value.ativo === true ? 'desativar' : 'ativar' }
                  </ButtonHandleAtivo>
                </div>
              </DispositivosInformacao>
            </Dispositivos>
          ))}
        </ContainerDispositivos>

      </Container>
    </Section>
  );
}

export default PerfilUsuarioVendedor;
