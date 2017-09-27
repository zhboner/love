import axios from 'axios';
import config from '../config';

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

const postingCommentFail = () => {
    return {
        type: POSTING_THE_COMMENT_FAIL
    }
};

export const postComment = (comment, postID, parentID = 0, callback) => {
    return (dispatch) => {
        const url = config.prefix + 'comments';
        const postComment = {
            author_name: comment.author_name || '',
            author_email: comment.author_email || '',
            parent: parentID,
            post: postID,
            content: comment.content
        };

        console.log(postComment, url);
        dispatch(postingComment());
        axios.post(url, postComment)
            .then(response => {
                console.log(response);
                dispatch(postingCommentSuccess());
                console.log(callback);
            })
            .catch(e => {
                console.log(e);
                dispatch(postingCommentFail());
            })
    }
};