import axios from 'axios';
import config from '../config';
import comment from "../reducers/comment";

export const REQUEST_COMMENTS_LIST = 'REQUEST_COMMENTS_LIST';
export const RECEIVE_COMMENTS_LIST = 'RECEIVE_COMMENTS_LIST';

const requestCommentsList = (postID) => {
    return {
        type: REQUEST_COMMENTS_LIST,
        postID: postID
    }
};

const receiveCommentsList = (commentsObj, postID, CommentsAmount, supDict) => {
    return {
        type: RECEIVE_COMMENTS_LIST,
        data: commentsObj,
        postID: postID,
        CommentsAmount: CommentsAmount,
        supDict: supDict
    }
};


export const fetchCommentList = (postID, page = 1) => {
    let url = config.prefix + 'comments?order=asc&post=' + postID + '&page=' + page;
    return (dispatch, getState) => {
        dispatch(requestCommentsList(postID));
        axios.get(url)
            .then((response) => {
                const commentList = response.data;
                let commentObj = changeListToObj(commentList);

                let queryIDs = {};
                let queryPromises = [];
                commentList.map(comment => {
                    if (comment.parent !== 0 && !commentObj[comment.parent]) {
                        queryIDs[comment.parent] = 0;
                    }
                });
                Object.keys(queryIDs).map(id => {
                    queryPromises.push(getCommentUser(id))
                });

                Promise.all(queryPromises).then(resList => {
                    let supDict = {};
                    resList.map(res => {
                        supDict[res.data.id] = res.data;
                    });

                    dispatch(receiveCommentsList(commentList, postID, parseInt(response.headers['x-wp-total'], 10), supDict));
                });

            })
    }
};

const getCommentUser = (id) => {
    const url = config.prefix + 'comments/' + id;
    return axios.get(url);
};

// Change comment list to comment object.
const changeListToObj = (commentList) => {
    let commentObj = {0: null};
    commentList.map(comment => {
        commentObj[comment.id] = comment;
    });
    return commentObj;
};