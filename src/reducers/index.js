const indexPage = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            postList: [],
            pageNO: 1,
            postAmount: 0,
            categories: []
        }
    }

    switch (action.type) {
        case 'SAVE_POSTS_LIST':
            return Object.assign({}, state, {postList: state.postList.concat(action.posts)});
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

export default indexPage;