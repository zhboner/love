import { RECEIVE_COMMENTS_LIST, REQUEST_COMMENTS_LIST, GET_COMMENT_LIST_FROM_CACHE } from '../actions/fetchCommentList';

const comment = (state = {},  action) => {
    switch (action.type) {
        case REQUEST_COMMENTS_LIST:
            return Object.assign({}, state, {
                [action.postID]: {
                    isFetching: true
                }
            });
        case GET_COMMENT_LIST_FROM_CACHE:
        case RECEIVE_COMMENTS_LIST:
            return Object.assign({}, state, {
                [action.postID]: {
                    isFetching: false,
                    content: action.data
                }
            });
        default:
            return state;
    }
};

export default comment;