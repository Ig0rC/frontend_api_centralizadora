import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-centralizador.softvendas.com.br/api-gestor/',
});
