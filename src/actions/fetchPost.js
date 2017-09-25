import axios from 'axios';
import config from '../config';

export const SAVE_THE_AMOUNT_OF_POSTS = 'SAVE_THE_AMOUNT_OF_POSTS';
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST';
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const GET_CACHED_POST = 'GET_CACHED_POST';

export const saveTheAmountOfPosts = (amount)=>{
    return {
        type: SAVE_THE_AMOUNT_OF_POSTS,
        value: amount
    }
};

const requestSinglePost = (slug) => {
    return {
        type: REQUEST_SINGLE_POST,
        slug
    }
};

const receiveSinglePost = (post) => {
    return {
        type: RECEIVE_SINGLE_POST,
        post
    }
};

const getPostFromCache = (post) => {
    return {
        type: GET_CACHED_POST,
        post
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

export const fetchSinglePost = (slug) => {
    return (dispatch, getState) => {
        const postsList = getState().postList.content;
        let result = null;
        postsList.map((post) => {
            if (post.slug === slug) {
                result = post;
            }
        });

        // If find the cache, return the cache
        if (result) {
            dispatch(getPostFromCache(result));
            return;
        }

        let url = config.prefix + 'posts?slug=' + slug;
        dispatch(requestSinglePost(slug));
        axios.get(url)
            .then(response => {return response.data[0]})            // TODO: I don't consider multiple posts here
            .then(post => {
                let content = extractExcerpt(post.content.rendered);
                post.content.rendered = content.content;
                dispatch(receiveSinglePost(post));
            })
    }
};

