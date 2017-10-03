import {
    BLOG_USER_ID,
    BLOG_USER_NAME,
    BLOG_USER_EMAIL,
    BLOG_USER_URL,
    BLOG_USER_NONCE
} from '../actions/sync';

const user = (
    state = {
        id: null,
        nonce: null,
        userName: null,
        userEmail: null,
        userURL: null
    }, action) => {
    switch (action.type) {
        case BLOG_USER_ID:
            return Object.assign({}, state, {id: action.id});
        case BLOG_USER_NAME:
            return Object.assign({}, state, {userName: action.name});
        case BLOG_USER_EMAIL:
            return Object.assign({}, state, {userEmail: action.email});
        case BLOG_USER_URL:
            return Object.assign({}, state, {userURL: action.url});
        case BLOG_USER_NONCE:
            return Object.assign({}, state, {nonce: action.nonce});
        default:
            return state;
    }
};

export default user;