import { SAVE_THE_AMOUNT_OF_POSTS } from '../actions/info';

const info = (state = {
    postAmount: 0
}, action) => {
    switch (action.type) {
        case SAVE_THE_AMOUNT_OF_POSTS:
            return Object.assign({}, state, {postAmount: action.value});
        default:
            return state;
    }
};

export default info;