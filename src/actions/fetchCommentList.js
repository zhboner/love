import axios from 'axios';
import config from '../config';

export const REQUEST_COMMENTS_LIST = 'REQUEST_COMMENTS_LIST';
export const RECEIVE_COMMENTS_LIST = 'RECEIVE_COMMENTS_LIST';

const requestCommentsList = (postID) => {
    return {
        type: REQUEST_COMMENTS_LIST,
        postID: postID
    }
};

const receiveCommentsList = (commentsList, postID, CommentsAmount) => {
    return {
        type: RECEIVE_COMMENTS_LIST,
        data: commentsList,
        postID: postID,
        CommentsAmount: CommentsAmount
    }
};


export const fetchCommentList = (postID, page = 1) => {
    let url = config.prefix + 'comments?order=asc&post=' + postID + '&page=' + page;
    return (dispatch, getState) => {
        dispatch(requestCommentsList(postID));
        axios.get(url)
            .then((response) => {
                console.log(response);
                dispatch(receiveCommentsList(response.data, postID, parseInt(response.headers['x-wp-total'], 10)));
            })
    }
};