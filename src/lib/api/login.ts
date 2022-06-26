import { getAnkaApi } from "./axios";

// Data returned when user is logged in
type UserLogin = {
    access_token: string;
};

// API call to check if a user exists, to aid in registering new users
const checkUserExists = async (username: string): Promise<boolean> => {
    return getAnkaApi().get(`/users/exists/${username}`);
}

// Regsiters a new user in the database
export const registerNewUser = async (username: string, password: string): Promise<void> => {
    if (!username || !password)
        return Promise.reject(new Error('Enter both email and password'));

    if (await checkUserExists(username)) {
        return Promise.reject(new Error('User already exists'));
    }
    
    return new Promise ((resolve, reject) => {
        getAnkaApi()
            .post('/users/register', { username, password })
            .then(res => {
                resolve();
            })
            .catch(err => {
                reject(err);
        });
    })

}
  
// Logs the user in using the username and password
// Returns the access token if successful
export const login = async (username: string, password: string): Promise<UserLogin> => {
    if (!username || !password)
        return Promise.reject(new Error('Enter both email and password'));

    return new Promise((resolve, reject) => {
        getAnkaApi()
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


// Local-storage & jwt-related functions

export const setJwtToLocalStorage = (jwt: string) => {
    window.localStorage.setItem('jwt', jwt);
}

export const logout = async (): Promise<void> => {
    window.localStorage.removeItem('jwt');
}

export const checkIsLoggedIn = (): boolean => {
    return window.localStorage.getItem('jwt') !== null;
}