import axios from 'axios';
import config from '../config';

export const REQUEST_NONCE = 'REQUEST_NONCE';
export const RECEIVE_NONCE = 'RECEIVE_NONCE';
export const GET_NONCE_FAIL = 'GET_NONCE_FAIL';

const requestNonce = () => {
    return {
        type: REQUEST_NONCE
    }
};

const receiveNonce = (nonce) => {
    return {
        type: RECEIVE_NONCE,
        nonce: nonce
    }
};

const failToGetNonce = () => {
    return {
        type: GET_NONCE_FAIL
    }
};

export const getNonce = () => {
    return (dispatch) => {
        dispatch(requestNonce());

        axios.get(config.zhbRoute + 'nonce')
            .then(response => {
                dispatch(receiveNonce(response.data))
            })
            .catch(e => {
                dispatch(failToGetNonce())
            })
    }
};
