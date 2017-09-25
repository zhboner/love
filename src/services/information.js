import axios from 'axios';

import config from '../config';

export const getSettings = ()=>{
    return axios.get(config.home + '/wp-json');
};