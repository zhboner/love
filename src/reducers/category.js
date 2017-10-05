import { RECEIVE_CATEGORIES, REQUEST_CATEGPROES } from '../actions/fetchCategories'

const category = (
    state = {
        idIndex: null,
        slugIndex: null,
        isFetching: false
    }, action
) => {
    switch (action.type) {
        case REQUEST_CATEGPROES:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {isFetching: false, idIndex: action.idIndex, slugIndex: action.slugIndex});
        default:
            return state;
    }
};

export default category;