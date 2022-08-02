import Axios from 'axios';
const ANKA_API = process.env.REACT_APP_URL;

var ankaApi = Axios.create({ 
    baseURL: ANKA_API, 
    timeout: 5000,
    headers: {
        Authorization: 'Bearer '+ localStorage.getItem('jwt')
    }
});

export const getAnkaApi = () => ankaApi;
export const resetAnkaApi = () => {
    ankaApi = Axios.create({ 
        baseURL: ANKA_API, 
        timeout: 5000,
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem('jwt')
        }
    });
}