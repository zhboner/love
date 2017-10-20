import {
    GET_NONCE_FAIL,
    RECEIVE_NONCE,
    REQUEST_NONCE
} from '../actions/getNonce';

const nonce = (state = {
        isFetching: false,
        content: null
}, action) => {
    switch (action.type) {
        case REQUEST_NONCE:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_NONCE:
            return Object.assign({}, state, {isFetching: false, content: action.nonce});
        case GET_NONCE_FAIL:
            return Object.assign({}, state, {isFetching: false});
        default:
            return state
    }
};

export default nonce;