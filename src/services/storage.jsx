const TOKEN_STORAGE = 'futmanager_token'
const USER_STORAGE = 'futmanager_user'
const TIMESTAMP_STORAGE = 'futmanager_timestamp'

const getHash = () => {
    return '%{poI#uZL*J}^tWQ(5b9KrV7fEx1vCg@qM&b,_8YjHm2T4D)F6>?*k{y3nU.=a-+Gd$NsA;wXe0cLhVvNtRz!Yi}pOsS[?';
}

export const setToken = (data) => {
    localStorage.setItem(TOKEN_STORAGE, btoa(JSON.stringify(data)) +":"+ getHash());
}

export const getToken = () => {
    return JSON.parse(atob(localStorage.getItem(TOKEN_STORAGE).split(':')[0]));
}

export const delToken = () => {
    localStorage.removeItem(TOKEN_STORAGE);  
}

export const setUser = (data) => {
    localStorage.setItem(USER_STORAGE, btoa(JSON.stringify(data)) +":"+ getHash());
    console.log("SetUser: ", USER_STORAGE)
}

export const getUser = () => {
    if(localStorage.getItem(USER_STORAGE) !== null){
        return JSON.parse(atob(localStorage.getItem(USER_STORAGE).split(':')[0]));
    } else {
        return ''
    }
}

export const delUser = () => {
    localStorage.removeItem(USER_STORAGE);  
}

export const setTimestamp = (data) => {
    localStorage.setItem(TIMESTAMP_STORAGE, data);
}

export const getTimestamp = () => {
    return localStorage.getItem(TIMESTAMP_STORAGE);
}
