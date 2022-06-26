import Axios from 'axios';

const ankaApi = Axios.create({ 
    baseURL: process.env.REACT_APP_URL, 
    timeout: 500000,
    headers: {
        Authorization: 'Bearer '+ localStorage.getItem('jwt')
    }
});

export default ankaApi;