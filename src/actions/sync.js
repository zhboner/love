export const REFRESH_POST_LIST = 'REFRESH_POST_LIST';

export const BLOG_USER_ID = 'BLOG_USER_ID';
export const BLOG_USER_NAME = 'BLOG_USER_NAME';
export const BLOG_USER_EMAIL = 'BLOG_USER_EMAIL';
export const BLOG_USER_URL = 'BLOG_USER_URL';
export const BLOG_USER_NONCE = 'BLOG_USER_NONCE';

export const refreshIndex = (refresh) => {
    return {
        type: REFRESH_POST_LIST,
        refresh: refresh
    }
};

export const saveUserID = (id) => {
    return {
        type: BLOG_USER_ID,
        id: id
    }
};

export const saveUserName = (name) => {
    return {
        type: BLOG_USER_NAME,
        name: name
    }
};

export const saveUserEmail = (email) => {
    return {
        type: BLOG_USER_EMAIL,
        email: email
    }
};

export const saveUserURL = (url) => {
    return {
        type: BLOG_USER_URL,
        url: url
    }
};

export const saveNonce = (nonce) => {
    return {
        type: BLOG_USER_NONCE,
        nonce: nonce
    }
};