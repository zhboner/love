import axios from 'axios';
import config from '../config';
import { fetchCommentList } from './fetchCommentList';

export const POSTING_THE_COMMENT = 'POSTING_THE_COMMENT';
export const POSTING_THE_COMMENT_SUCCESS = 'POSTING_THE_COMMENT_SUCCESS';
export const POSTING_THE_COMMENT_FAIL = 'POSTING_THE_COMMENT_FAIL';

const postingComment = () => {
    return {
        type: POSTING_THE_COMMENT
    }
};

const postingCommentSuccess = () => {
    return {
        type: POSTING_THE_COMMENT_SUCCESS
    }
};

const postingCommentFail = (error_message) => {
    return {
        type: POSTING_THE_COMMENT_FAIL,
        error_message
    }
};

export const postComment = (comment, postID, parentID = 0, callback) => {
    return (dispatch) => {
        const url = config.prefix + 'comments';
        const postComment = {
            author_name: comment.author_name || '',
            author_email: comment.author_email || '',
            author_url: comment.author_url || '',
            parent: parentID,
            post: postID,
            content: comment.content
        };
        dispatch(postingComment());
        axios.post(url, postComment)
            .then(response => {
                dispatch(postingCommentSuccess());
                dispatch(fetchCommentList(postID));
            })
            .catch(e => {
                dispatch(postingCommentFail(e.response.data.message));
            })
    }
};