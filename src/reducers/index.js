const indexPage = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            postList: [],
            pageNO: 1,
            postAmount: 0
        }
    }

    switch (action.type) {
        case 'SAVE_POSTS_LIST':
            return Object.assign({}, state, {postList: state.postList.concat(action.posts)});
        case 'INCREASE_NAV_NO':
            return Object.assign({}, state, {pageNO: state.pageNO + 1});
        case 'SAVE_THE_AMOUNT_OF_POSTS':
            return Object.assign({}, state, {postAmount: action.value});
        default:
            return state;
    }
};

export default indexPage;