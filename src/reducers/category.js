import { RECEIVE_CATEGORIES, REQUEST_CATEGPROES } from '../actions/fetchCategories'

const category = (
    state = {
        categories: {},
        isFetching: false
    }, action
) => {
    switch (action.type) {
        case REQUEST_CATEGPROES:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {isFetching: false, categories: action.categories});
        case 'SAVE_CATEGORIES':
            return Object.assign({}, state, {categories: action.categories});
        default:
            return state;
    }
};

export default category;