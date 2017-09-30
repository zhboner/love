import {
    RECEIVE_COMMENTS_LIST,
    REQUEST_COMMENTS_LIST,
} from '../actions/fetchCommentList';

import {
    POSTING_THE_COMMENT_FAIL,
    POSTING_THE_COMMENT,
    POSTING_THE_COMMENT_SUCCESS
} from '../actions/postComment'

const comment = (state = {
    isPosting: false,       // Post comments
    success: false,
    fail: false,
    error_message: '',

    postID: -1,              // Retrive comments
    content: [],
    isFetching: false,
    CommentsAmount: 0,
    supDict: {}
},  action) => {
    switch (action.type) {
        case REQUEST_COMMENTS_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                postID: action.postID
            });
        case RECEIVE_COMMENTS_LIST:
            return Object.assign({}, state, {
                postID: action.postID,
                content: action.data,
                CommentsAmount: action.CommentsAmount,
                isFetching: false,
                supDict: action.supDict
            });

        case POSTING_THE_COMMENT:
            return Object.assign({}, state, {isPosting: true, success: false, fail: false});
        case POSTING_THE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                isPosting: false,
                success: true,
                fail: false
            });
        case POSTING_THE_COMMENT_FAIL:
            return Object.assign({}, state, {
                isPosting: false,
                success: false,
                fail: true,
                error_message: action.error_message
            });

        default:
            return state;
    }
};

export default comment;