export const REFRESH_POST_LIST = 'REFRESH_POST_LIST';

export const refreshIndex = (refresh) => {
    return {
        type: REFRESH_POST_LIST,
        refresh: refresh
    }
};