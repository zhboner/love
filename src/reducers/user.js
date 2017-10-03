import {
    BLOG_USER_ID,
    BLOG_USER_NAME,
    BLOG_USER_EMAIL,
    BLOG_USER_URL
} from '../actions/sync';

const user = (
    state = {
        id: null,
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
        default:
            return state;
    }
};

export default user;