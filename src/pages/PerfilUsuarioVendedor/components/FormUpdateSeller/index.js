import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, DivButton } from './styles';
import api from '../../../../services/axios';
import { Input, Button, Select } from '../../../../styles/GenericStyles';

function FormUpdateSeller({ id }) {
  const [$acessos, setAcessos] = useState(0);
  const [$usuario, setUsuario] = useState(0);
  const [$ativo, setAtivo] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api
          .get(`/usuario-vendedor/buscar/${id}`);

        setAcessos(data.acessos);
        setUsuario(data.usuario);
        return setAtivo(data.ativo);
      } catch (error) {
        if (error.response) {
          const { data: { mensagem } } = error.response;
          return toast.error(`${mensagem}`);
        }

        return toast.error('Por favor, entre em contato com a SoftVendas');
      }
    })();
  }, []);

  const handleUpdateSellerUser = async (e) => {
    e.preventDefault();
    try {
      const { data: { mensagem } } = await api.put(`/usuario-vendedor/${id}`, {
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

  return (
    <Form onSubmitCapture={handleUpdateSellerUser}>

      <div>
        <p>Usuário: </p>
        <Input
          type="text"
          id="usuario"
          value={$usuario}
          disabled
          onChange={({ target: { value } }) => setUsuario(value)}
        />
      </div>

      <div>
        <p>Acessos:</p>
        <Input
          type="number"
          id="nome_fantasia"
          value={$acessos}
          onChange={({ target: { value } }) => setAcessos(value)}
        />
      </div>

      <div>
        <p>Ativo:</p>
        <Select
          value={$ativo}
          onChange={({ target: { value } }) => setAtivo(value)}
        >
          <option value>Sim</option>
          <option value={false}>Não</option>
        </Select>
      </div>

      <DivButton>
        <Button
          type="submit"
        >
          Salvar
        </Button>
      </DivButton>
    </Form>
  );
}

export default FormUpdateSeller;
