import Axios from 'axios';

const ankaApi = Axios.create({ baseURL: process.env.REACT_APP_URL, timeout: 500000 });

type UserLogin = {
    id: string;
    authToken: string;
    username: string;
};
  
export const login = (username: string, password: string): Promise<UserLogin> => {
    if (!username || !password)
        return Promise.reject(new Error('Enter both email and password'));

    return new Promise((resolve, reject) => {
        ankaApi
        .post('/auth/login', { username, password })
        .then(({ data }) => {
            const {
            id,
            authToken,
            username,
            } = data;

            resolve({
            id,
            authToken,
            username,
            });
        })
        .catch(err => {
            reject(err.request.response);
        });
    });
};
