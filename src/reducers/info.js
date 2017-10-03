import { SAVE_THE_AMOUNT_OF_POSTS,
    RECEIVE_BASIC_INFORMATION,
    REQUEST_BASIC_INFORMATION,
} from '../actions/info';

const info = (state = {
    postAmount: 0,
    content: null,
    isFetching: false,
}, action) => {
    switch (action.type) {
        case SAVE_THE_AMOUNT_OF_POSTS:
            return Object.assign({}, state, {postAmount: action.value});
        case REQUEST_BASIC_INFORMATION:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_BASIC_INFORMATION:
            return Object.assign({}, state, {content: action.info, isFetching: false});

        default:
            return state;
    }
};

export default info;