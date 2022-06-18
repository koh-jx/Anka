import Axios from 'axios';

const ankaApi = Axios.create({ baseURL: process.env.REACT_APP_URL, timeout: 500000 });

type UserLogin = {
    access_token: string;
};

const checkUserExists = async (username: string): Promise<boolean> => {
    const res = await ankaApi.get(`/users/exists/${username}`);
    return res.data;
}

export const registerNewUser = async (username: string, password: string): Promise<void> => {
    if (!username || !password)
        return Promise.reject(new Error('Enter both email and password'));

    if (await checkUserExists(username)) {
        return Promise.reject(new Error('User already exists'));
    }
    
    return new Promise ((resolve, reject) => {
        ankaApi
        .post('/users/register', { username, password })
        .then(res => {
            console.log(res);
            resolve();
        })
        .catch(err => {
            reject(err);
        });
    })

}
  
export const login = async (username: string, password: string): Promise<UserLogin> => {
    if (!username || !password)
        return Promise.reject(new Error('Enter both email and password'));

    return new Promise((resolve, reject) => {
        ankaApi
        .post('/auth/login', { username, password })
        .then(({ data }) => {
            const {access_token} = data;

            resolve({access_token});
        })
        .catch(err => {
            reject(err.request.response);
        });
    });
};

export const setJwtToLocalStorage = (jwt: string) => {
    window.localStorage.setItem('jwt', jwt);
}

export const logout = async (): Promise<void> => {
    window.localStorage.removeItem('jwt');
}