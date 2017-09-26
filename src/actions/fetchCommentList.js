import axios from 'axios';
import config from '../config';

export const REQUEST_COMMENTS_LIST = 'REQUEST_COMMENTS_LIST';
export const RECEIVE_COMMENTS_LIST = 'RECEIVE_COMMENTS_LIST';
export const GET_COMMENT_LIST_FROM_CACHE = 'GET_COMMENT_LIST_FROM_CACHE';

const requestCommentsList = (postID) => {
    return {
        type: REQUEST_COMMENTS_LIST,
        postID: postID
    }
};

const receiveCommentsList = (commentsList, postID) => {
    return {
        type: RECEIVE_COMMENTS_LIST,
        data: commentsList,
        postID: postID
    }
};

const getCommentsListFromCache = (commentsList, postID) => {
    return {
        type: RECEIVE_COMMENTS_LIST,
        data: commentsList,
        postID: postID
    }
};

export const fetchCommentList = (postID) => {
    let url = config.prefix + 'comments?post=' + postID;
    return (dispatch, getState) => {
        if (getState().comment[postID] && getState().comment[postID].content) {
            dispatch(getCommentsListFromCache(getState().comment[postID].content, postID));
            return;
        }

        dispatch(requestCommentsList(postID));
        axios.get(url)
            .then((response) => {
                dispatch(receiveCommentsList(response.data, postID));
            })
    }
};