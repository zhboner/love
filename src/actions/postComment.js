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
        let instance = {
            url: url,
            method: 'post'
        };
        let postComment = {
            parent: parentID,
            post: postID,
            content: comment.content
        };

        if (!comment.userID) {
            postComment = Object.assign({}, postComment, {
                author_name: comment.author_name || '',
                author_email: comment.author_email || '',
                author_url: comment.author_url || ''
            });
            instance.data = postComment;
        } else {
            postComment = Object.assign({}, postComment, {
                author: comment.userID,
            });
            instance.data = postComment;
            instance.headers = {
                'X-WP-Nonce': comment.nonce
            };
        }
        dispatch(postingComment());
        axios.request(url, instance)
            .then(response => {
                dispatch(postingCommentSuccess());
                dispatch(fetchCommentList(postID));
            })
            .catch(e => {
                console.log(e);
                dispatch(postingCommentFail(e.response.data.message));
            })
    }
};