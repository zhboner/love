import { REQUEST_POSTS_LIST, RECEIVE_POSTS_LIST } from '../actions/fetchPostsList';


const postList = (
    state = {
        isFetching: false,
        pageNO: 0,
        content: []
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

        default:
            return state;
    }
};

export default postList;