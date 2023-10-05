import axios from "axios"

const backUrl = 'http://127.0.0.1:8000/'//import.meta.env.VITE_BACKEND_URL

export const setHeader = (bearer, token) => {
    axios.defaults.headers.common['Authorization'] = bearer+' '+token;
}

export const get = (url) => {
    return axios.get(backUrl + url);
}

export const post = (url, body=null) => {
    return axios.post(backUrl + url, body);
}

export const doDelete = (url) => {
    return axios.delete(backUrl + url);
}

export const put = (url, body=null) => {
    return axios.put(backUrl + url, body);
}