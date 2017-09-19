import axios from 'axios';

export const getSettings = ()=>{
    return axios.get('https://www.zgoing.com/wp-json');
};