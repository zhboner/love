import { RECEIVE_POST_LIST_BY_CATEGORY, REQUEST_POST_LIST_BY_CATEGORY } from '../actions/fetchPostsList';

const postListByCategory = (
    state = {
        isFetching: false,
        pageNO: 0,
        content: [],
        refresh: null
    }, action) => {
    switch (action.type) {
        case REQUEST_POST_LIST_BY_CATEGORY:
            return Object.assign({}, state, {
                pageNO: action.pageNO,
                isFetching: true
            });
        case RECEIVE_POST_LIST_BY_CATEGORY:
            return Object.assign({}, state, {
                isFetching: false,
                content: action.postsList
            });
        default:
            return state;
    }
};

export default postListByCategory;