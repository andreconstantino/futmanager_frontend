import axios from "axios"
import { getToken, setToken, setUser } from "./storage";

const backUrl = 'http://127.0.0.1:8000/'//import.meta.env.VITE_BACKEND_URL

export const setHeader = (bearer, token) => {
    var token = getToken();
    axios.defaults.headers.common['Authorization'] = token.token_type+' '+token.access_token;
}

export const get = (url) => {
    setHeader();
    return axios.get(backUrl + url).catch((error)=>{
        if (error?.response?.data?.message == 'Unauthenticated.') {
            postRefreshLogin()
        }
    });;
}

export const post = (url, body=null) => {
    setHeader();
    return axios.post(backUrl + url, body).catch((error)=>{
        console.log(error)
    });
}

export const postLogin = (url, body=null) => {
    return axios.post(backUrl + url, body);
}

export const postRefreshLogin = () => {
    setHeader();
    var token = getToken();

    var body = {
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        client_id: import.meta.env.VITE_CLIENT_ID, 
        client_secret: import.meta.env.VITE_CLIENT_SECRET
      }
    
    return axios.post(backUrl + 'oauth/token', body).then((response)=>{
        setToken(response.data)
        me()
    });
}

export const me =() => {
    get('api/me').then((response) => {
      setUser(response.data);
    }).catch ((error) => {
      console.log(error)
    })
  }

export const del = (url) => {
    setHeader();
    return axios.delete(backUrl + url);
}

export const put = (url, body=null) => {
    setHeader();
    return axios.put(backUrl + url, body);
}