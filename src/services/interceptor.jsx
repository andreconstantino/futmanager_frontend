import axios from 'axios';
import { getTimestamp, getToken, getUser } from './storage';
import { postRefreshLogin, setHeader } from './http';

const axiosInstance = axios.create({
  
});

axiosInstance.interceptors.request.use(
  async (config) => {
    
    if (precisaRenovarToken()) {
        await postRefreshLogin();
    }

    const token = getToken();
    const user = getUser();

    if(!token || !user){
      throw Error
    }

    config.headers['Authorization'] = token.token_type+' '+token.access_token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function precisaRenovarToken () {
    if (getTimestamp() !== null && getToken() !== null) {
        var timestampAntigo = Number(getTimestamp())
        var expires = Number(getToken().expires_in) - 10
        var timestampAtual = new Date().getTime()

        return timestampAntigo + (expires * 1000) < timestampAtual
    }
    return false
}

export default axiosInstance;