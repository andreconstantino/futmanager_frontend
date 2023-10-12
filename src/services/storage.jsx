const USER_STORAGE = 'futmanager_user'

const getHash = () => {
    return '%{poI#uZL*J}^tWQ(5b9KrV7fEx1vCg@qM&b,_8YjHm2T4D)F6>?*k{y3nU.=a-+Gd$NsA;wXe0cLhVvNtRz!Yi}pOsS[?';
}

export const setUser = (data) => {
    localStorage.setItem(USER_STORAGE, btoa(JSON.stringify(data)) +":"+ getHash());
}

export const getUser = () => {
    return JSON.parse(atob(localStorage.getItem(USER_STORAGE).split(':')[0]));
}

export const delUser = () => {
    localStorage.removeItem(USER_STORAGE);  
}