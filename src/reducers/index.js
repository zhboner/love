import {combineReducers} from 'redux';

const indexPage = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            postList: [],
            pageNO: 1,
            postAmount: 0,
            categories: {}
        }
    }

    switch (action.type) {
        case 'SAVE_POSTS_LIST':
            return Object.assign({}, state, {postList: action.posts});
        case 'INCREASE_NAV_NO':
            return Object.assign({}, state, {pageNO: state.pageNO + 1});
        case 'SAVE_THE_AMOUNT_OF_POSTS':
            return Object.assign({}, state, {postAmount: action.value});
        case 'SAVE_CATEGORIES':
            return Object.assign({}, state, {categories: action.categories});
        default:
            return state;
    }
};


const post = (
    state = {
        postList: [],
        pageNO: 1,
        postAmount: 0
    }, action
) => {
    switch(action.type) {
        case 'SAVE_POSTS_LIST':
            return Object.assign({}, state, {postList: action.posts});
        case 'SAVE_THE_AMOUNT_OF_POSTS':
            return Object.assign({}, state, {postAmount: action.value});
        default:
            return state;
    }
};

const category = (
    state = {
        categories: {}
    }, action
) => {
    switch (action.type) {
        case 'SAVE_CATEGORIES':
            return Object.assign({}, state, {categories: action.categories});
        default:
            return state;
    }
};

// export default indexPage;

export default combineReducers({post, category});