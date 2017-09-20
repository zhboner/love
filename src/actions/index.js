export const savePosts = (posts)=>{
    return {
        type: 'SAVE_POSTS_LIST',
        posts: posts
    }
};

export const saveCategories = (categories)=>{
    return {
        type: 'SAVE_CATEGORIES',
        categories: categories
    }
};

export const increaseNavNO = ()=>{
    return {
        type: 'INCREASE_NAV_NO'
    }
};

export const saveTheAmountOfPosts = (amount)=>{
    return {
        type: 'SAVE_THE_AMOUNT_OF_POSTS',
        value: amount
    }
};