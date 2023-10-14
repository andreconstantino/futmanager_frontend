import axios from "axios"
import { getToken } from "./storage";

const backUrl = 'http://127.0.0.1:8000/'//import.meta.env.VITE_BACKEND_URL

export const setHeader = (bearer, token) => {
    var token = getToken();
    axios.defaults.headers.common['Authorization'] = token.token_type+' '+token.access_token;
}

export const get = (url) => {
    setHeader();
    return axios.get(backUrl + url);
}

export const post = (url, body=null) => {
    setHeader();
    return axios.post(backUrl + url, body);
}

export const postLogin = (url, body=null) => {
    return axios.post(backUrl + url, body);
}

export const doDelete = (url) => {
    setHeader();
    return axios.delete(backUrl + url);
}

export const put = (url, body=null) => {
    setHeader();
    return axios.put(backUrl + url, body);
}