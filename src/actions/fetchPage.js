import axios from 'axios';
import config from '../config';

export const REQUIRE_PAGE = 'REQUIRE_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const FETCH_PAGE_FAIL = 'FETCH_PAGE_FAIL';
export const CLEAR_PAGE = 'CLEAR_PAGE';

const requestPage = () => {
    return {
        type: REQUIRE_PAGE
    }
};

const receivePage = (page) => {
    return {
        type: RECEIVE_PAGE,
        content: page
    }
};

const failGetPage = () => {
    return {
        type: FETCH_PAGE_FAIL
    }
};

export const fetchPage = (slug) => {
    return (dispatch) => {
        const url = config.prefix + 'pages?slug=' + slug;
        dispatch(requestPage());
        axios.get(url)
            .then(response => {
                dispatch(receivePage(response.data[0]))
            })
            .catch(e => {
                dispatch(failGetPage());
                console.log(e)
            })
    }
};

export const clearCurrentPage = () => {
    return {
        type: CLEAR_PAGE
    }
};