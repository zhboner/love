import axios from 'axios';
import config from '../config';

export const REQUEST_CATEGPROES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

const requestCategories = () => {
    return {
        type: REQUEST_CATEGPROES,
    }
};

const receiveCategories = (categories) => {
    return {
        type: RECEIVE_CATEGORIES,
        categories: categories
    }
};

export const fetchCategories = () => {
    let url = config.prefix + 'categories';

    return (dispatch) => {
        dispatch(requestCategories());

        axios.get(url)
            .then(response => {
                return response.data;
            })
            .then(categories => {
                let result = {};
                categories.map((cat) => {
                    result[cat.id] = cat.name;
                });
                dispatch(receiveCategories(result));
            })
    }
};