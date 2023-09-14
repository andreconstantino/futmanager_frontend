import axios from "axios"

export const setHeader = (bearer, token) => {
    axios.defaults.headers.common['Authorization'] = bearer+' '+token;
}

export const get = (url) => {
    return axios.get(url);
}

export const post = (url, body=null) => {
    return axios.post(url, body);
}

export const doDelete = (url) => {
    return axios.delete(url);
}

export const put = (url, body=null) => {
    return axios.put(url, body);
}