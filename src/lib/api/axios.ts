import Axios from 'axios';
const ANKA_API = "https://anka-api.herokuapp.com/api";

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