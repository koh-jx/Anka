import Axios from 'axios';

var ankaApi = Axios.create({ 
    baseURL: process.env.REACT_APP_URL, 
    timeout: 5000,
    headers: {
        Authorization: 'Bearer '+ localStorage.getItem('jwt')
    }
});

export const getAnkaApi = () => ankaApi;
export const resetAnkaApi = () => {
    ankaApi = Axios.create({ 
        baseURL: process.env.REACT_APP_URL, 
        timeout: 5000,
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem('jwt')
        }
    });
}