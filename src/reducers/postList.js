import { REQUEST_POSTS_LIST, RECEIVE_POSTS_LIST } from '../actions/fetchPostsList';
import { REFRESH_POST_LIST } from '../actions/sync';


const postList = (
    state = {
        isFetching: false,
        pageNO: 0,
        content: [],
        refresh: null
    }, action
) => {
    switch(action.type) {
        case REQUEST_POSTS_LIST:
            return Object.assign({}, state, {
                pageNO: action.pageNO,
                isFetching: true
            });
        case RECEIVE_POSTS_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                content: action.postsList
            });

        case REFRESH_POST_LIST:
            return Object.assign({}, state, {refresh: action.refresh});

        default:
            return state;
    }
};

export default postList;