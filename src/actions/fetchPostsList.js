import axios from 'axios';
import config from '../config';
import { saveTheAmountOfPosts } from './fetchPost';
import { extractExcerpt } from '../lib/extractExcerpt';

export const REQUEST_POSTS_LIST = "REQUEST_POSTS_LIST";
export const RECEIVE_POSTS_LIST = "RECEIVE_POSTS_LIST";

export const REQUEST_POST_LIST_BY_CATEGORY = 'REQUEST_POST_LIST_BY_CATEGORY';
export const RECEIVE_POST_LIST_BY_CATEGORY = 'RECEIVE_POST_LIST_BY_CATEGORY';


const requestPostsList = (pageNO) => {
    return {
        type: REQUEST_POSTS_LIST,
        pageNO: pageNO
    }
};

const receivePostsList = (postsList) => {
    return {
        type: RECEIVE_POSTS_LIST,
        postsList: postsList
    }
};

const requestPostsListByCategory = (pageNO) => {
    return {
        type: REQUEST_POST_LIST_BY_CATEGORY,
        pageNO: pageNO
    }
};

const receivePostsListByCateGory = (postsList) => {
    return {
        type: RECEIVE_POST_LIST_BY_CATEGORY,
        postsList: postsList
    }
};


export const fetchPostsList = (pageNO = 1, category = null) => {
    let url = config.prefix + 'posts?page=' + pageNO;

    if (category) {
        url = url + '&categories=' + category;
    }

    return (dispatch, getState) => {

        // Don't fetch data if cached available
        if (!category && pageNO === getState().postList.pageNO) {
            return;

        }

        if (category) {
            dispatch(requestPostsListByCategory(pageNO));
        } else {
            dispatch(requestPostsList(pageNO));
        }

        return axios.get(url)
            .then(response => {
                // Save the total number of posts
                let amount = parseInt(response.headers['x-wp-total'], 10);
                if (!category) {
                    dispatch(saveTheAmountOfPosts(amount));
                }
                return response;
            })
            .then(response => {
                // Extract posts list
                return response.data;
            })
            .then(postsList => {
                // change posts' excerpt and content

                postsList.map(post => {
                    let tmp = extractExcerpt(post.content.rendered);
                    post.excerpt.rendered = tmp.excerpt;
                    post.content.rendered = tmp.content;
                });
                return postsList;
            })
            .then(postList => {
                if (!category) {
                    dispatch(receivePostsList(postList));
                } else {
                    dispatch(receivePostsListByCateGory(postList))
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
};