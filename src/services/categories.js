import axios from 'axios';

import config from './config';

const {prefix} = config;

export const getCategoriesList = () => {
    return axios.get(prefix + 'categories');
};