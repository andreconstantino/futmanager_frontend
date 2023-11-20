import { getToken, setTimestamp, setToken, setUser } from "./storage";
import axiosInstance from "./interceptor";
import axios from "axios";

const backUrl = 'http://127.0.0.1:8000/'//import.meta.env.VITE_BACKEND_URL

export const setHeader = (bearer, token) => {
    var token = getToken();
    axiosInstance.defaults.headers.common['Authorization'] = token.token_type+' '+token.access_token;
}

export const get = (url) => {
    return axiosInstance.get(backUrl + url).catch((error)=>{
        console.log(error);
    });;
}

export const post = (url, body=null) => {
    return axiosInstance.post(backUrl + url, body).catch((error)=>{
        console.log(error)
    });
}

export const postLogin = (url, body=null) => {
    return axios.post(backUrl + url, body);
}

export const postRefreshLogin = () => {
    var token = getToken();

    var body = {
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        client_id: import.meta.env.VITE_CLIENT_ID, 
        client_secret: import.meta.env.VITE_CLIENT_SECRET
      }
    
    return axios.post(backUrl + 'oauth/token', body).then((response)=>{
        setToken(response.data)
        setTimestamp(new Date().getTime())
        console.log('auth',response.data)
    }).catch((error) => {
        console.log(error)
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
    return axiosInstance.delete(backUrl + url);
}

export const put = (url, body=null) => {
    return axiosInstance.put(backUrl + url, body);
}