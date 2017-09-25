import axios from 'axios';
import config from '../config';
import { saveTheAmountOfPosts } from './fetchPost'

export const REQUEST_POSTS_LIST = "REQUEST_POSTS_LIST";
export const RECEIVE_POSTS_LIST = "RECEIVE_POSTS_LIST";


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

const extractExcerpt = (text) => {
    let splitContent = text.split(new RegExp(/<p.*><!--more--><\/p>/, 'i'));
    let excerpt = splitContent[0],
        content = '';
    if (splitContent[1]) {
        content = splitContent[0].concat(splitContent[1]);
    } else {
        content = excerpt;
    }

    return {
        excerpt: excerpt,
        content: content
    }
};


export const fetchPostsList = (pageNO = 1) => {
    let url = config.prefix + 'posts?page=' + pageNO;
    return (dispatch, getState) => {

        // Don't fetch data if cached available
        if (pageNO === getState().postList.pageNO) {
            return;
        }

        dispatch(requestPostsList(pageNO));
        return axios.get(url)
            .then(response => {
                // Save the total number of posts

                let amount = parseInt(response.headers['x-wp-total'], 10);
                dispatch(saveTheAmountOfPosts(amount));
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
                dispatch(receivePostsList(postList));
            })
    }
};