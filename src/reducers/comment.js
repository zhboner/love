import {
    RECEIVE_COMMENTS_LIST,
    REQUEST_COMMENTS_LIST,
    GET_COMMENT_LIST_FROM_CACHE,
} from '../actions/fetchCommentList';

import {
    POSTING_THE_COMMENT_FAIL,
    POSTING_THE_COMMENT,
    POSTING_THE_COMMENT_SUCCESS
} from '../actions/postComment'

const comment = (state = {
    isPosting: false,
    success: false,
    fail: false
},  action) => {
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

        case POSTING_THE_COMMENT:
            return Object.assign({}, state, {isPosting: true, success: false, fail: false});
        case POSTING_THE_COMMENT_SUCCESS:
            return Object.assign({}, state, {isPosting: false, success: true, fail: false});
        case POSTING_THE_COMMENT_FAIL:
            return Object.assign({}, state, {isPosting: false, success: false, fail: true});

        default:
            return state;
    }
};

export default comment;