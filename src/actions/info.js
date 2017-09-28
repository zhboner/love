import axios from 'axios';
import config from '../config';

export const SAVE_THE_AMOUNT_OF_POSTS = 'SAVE_THE_AMOUNT_OF_POSTS';
export const REQUEST_BASIC_INFORMATION = 'REQUEST_BASIC_INFORMATION';
export const RECEIVE_BASIC_INFORMATION = 'RECEIVE_BASIC_INFORMATION';

const requestInformation = () => {
    return {
        type: REQUEST_BASIC_INFORMATION
    }
};

const receiveInformation = (info) => {
    return {
        type: RECEIVE_BASIC_INFORMATION,
        info
    }
};

export const fetchInformation = () => {
    return (dispatch) => {
        const url = config.home + '/wp-json';
        dispatch(requestInformation());
        axios.get(url).then(response => {
            dispatch(receiveInformation(response.data))
        })
            .catch(e => {
                console.log(e)
            })
    }
};
