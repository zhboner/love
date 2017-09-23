import axios from 'axios';

import config from './config';

const {prefix} = config;

export const getPosts = (pageNO = 1) => {
    return axios.get(prefix + 'posts?page=' + pageNO)
};

export const findPostBySlug = (slug, postsList) => {
    return new Promise((res, rej) => {
        let target = null;
        postsList.map((single)=>{
            if (single.slug === slug) {
                target = single;
            }
        });

        if (target) {
            res(target)
        } else {
            fetchPostBySlug(slug).then((response)=> {
                target = response.data[0];
                if (!target) {
                    rej('Can\'t find in server');
                } else {
                    target.content.rendered = extractExcerpt(target.content.rendered).content;
                    res(target);
                }
            }, (e)=>{
                rej('Failed to load from server');
            })
        }
    })
};

export const extractExcerpt = (text) => {
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

const fetchPostBySlug = (slug) => {
    return axios.get(prefix + 'posts?slug=' + slug);
};

