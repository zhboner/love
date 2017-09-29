import { RECEIVE_PAGE, REQUIRE_PAGE, FETCH_PAGE_FAIL, CLEAR_PAGE } from '../actions/fetchPage';

const page = (state = {
    isFetching: false,
    content: null,
    failed: false
}, action) => {
    switch (action.type) {
        case REQUIRE_PAGE:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_PAGE:
            return Object.assign({}, state, {isFetching: false, content: action.content});
        case FETCH_PAGE_FAIL:
            return Object.assign({}, state, {failed: true});
        case CLEAR_PAGE:
            return Object.assign({}, state, {isFetching: false, content: null, failed: false});
        default:
            return state;

    }
};

export default page;