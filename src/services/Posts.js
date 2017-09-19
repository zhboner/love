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
            fetchPostBySluf(slug).then((response)=> {
                target = response.data[0];
                if (!target) {
                    rej('Can\'t find in server');
                } else {
                    res(target);
                }
            }, (e)=>{
                rej('Failed to load from server');
            })
        }
    })
};

const fetchPostBySluf = (slug) => {
    return axios.get(prefix + 'posts?filter[name]=' + slug);
};

