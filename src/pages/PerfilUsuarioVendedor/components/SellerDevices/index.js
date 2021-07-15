import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Search,
  ButtonHandleAtivo,
  DeviceIcon,
  SubContainerFirst,
  DeviceInfo,
  SubContainerSecond,
  DeviceDescription,
} from './styles';
import iphone from '../../../../images/iphone.png';
import api from '../../../../services/axios';
import { Input } from '../../../../styles/GenericStyles';

function SellerDevices({ id }) {
  const [restart, setRestart] = useState(false);
  const [devices, setDevices] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [devicesSave, setDevicesSave] = useState([]);
  const [clear, setClear] = useState(true);

  useEffect(() => {
    if (clear) {
      setDevicesSave(devices);
    }
    if (userSearch !== '') {
      const filterArray = devices.filter((value) => {
        const customSearchUser = userSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        return (
          value.modelo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
          || value.id_dispositivo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(customSearchUser) > -1
        );
      });
      setClear(false);
      return setDevices(filterArray);
    }
    setClear(true);
    return setDevices(devicesSave);
  }, [userSearch]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/dispositivo-vendedor/${id}`);

        return setDevices(data);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;

          return toast.error(`${mensagem}`);
        }
        return toast.success('Por favor, entre em contato com a SoftVendas');
      }
    })();
  }, [restart]);

  const handleDisableDevices = async (idDevice) => {
    try {
      const { data: { mensagem } } = await api.put(`/dispositivo-vendedor/${idDevice}`);

      setRestart((prevState) => (prevState !== true));

      return toast.success(`${mensagem}`);
    } catch (error) {
      if (error.response) {
        const { data: { mensagem } } = error.response;

        return toast.error(`${mensagem}`);
      }
      return toast.success('Por favor, entre em contato com a SoftVendas');
    }
  };

  return (
    <>
      <Search>
        <Input
          type="text"
          onChange={({ target: { value } }) => setUserSearch(value)}
          placeholder="Buscar..."
        />
      </Search>

      <SubContainerFirst>
        {devices.map((value) => (
          <SubContainerSecond key={value._id}>
            <DeviceIcon>
              <img src={`${iphone}`} alt="iphone" />
            </DeviceIcon>
            <DeviceDescription>
              <div>
                <p>id:
                  <DeviceInfo colorCustom={value.ativo}>
                    {value.id_dispositivo}
                  </DeviceInfo>
                </p>
                <p>modelo:
                  <DeviceInfo colorCustom={value.ativo}>
                    {value.modelo}
                  </DeviceInfo>
                </p>
                <p>situação:
                  <DeviceInfo colorCustom={value.ativo}>
                    {value.ativo === true ? 'ativo' : 'desativado'}
                  </DeviceInfo>
                </p>
              </div>
              <div style={{
                flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
              }}
              >
                <ButtonHandleAtivo
                  onClick={() => handleDisableDevices(value._id)}
                  colorCustom={value.ativo}
                  type="button"
                >
                  {value.ativo === true ? 'desativar' : 'ativar' }
                </ButtonHandleAtivo>
              </div>
            </DeviceDescription>
          </SubContainerSecond>
        ))}
      </SubContainerFirst>
    </>
  );
}

export default SellerDevices;
