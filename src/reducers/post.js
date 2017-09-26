import {
    SAVE_THE_AMOUNT_OF_POSTS,
    RECEIVE_SINGLE_POST,
    GET_CACHED_POST,
    REQUEST_SINGLE_POST,
    CLEAR_CURRENT_POST
} from '../actions/fetchPost'


const post = (
    state = {
        content: null,
        isFetching: false
    }, action
) => {
    switch(action.type) {
        case SAVE_THE_AMOUNT_OF_POSTS:
            return Object.assign({}, state, {postAmount: action.value});
        case CLEAR_CURRENT_POST:
            return Object.assign({}, state, {content: null, isFetching: false});

        case GET_CACHED_POST:
        case RECEIVE_SINGLE_POST:
            return Object.assign({}, state, {
                content: action.post,
                isFetching: false
            });
        case REQUEST_SINGLE_POST:
            return Object.assign({}, state, {isFetching: true});
        default:
            return state;
    }
};

export default post;