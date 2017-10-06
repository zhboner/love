import axios from 'axios';
import config from '../config';

export const REQUEST_CATEGPROES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

const requestCategories = () => {
    return {
        type: REQUEST_CATEGPROES,
    }
};

const receiveCategories = (idIndex, slugIndex) => {
    return {
        type: RECEIVE_CATEGORIES,
        idIndex: idIndex,
        slugIndex: slugIndex
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
                let idIndex = {},
                    slugIndex = {};
                categories.map((cat) => {
                    idIndex[cat.id] = cat;
                    slugIndex[cat.slug] = cat;
                });
                dispatch(receiveCategories(idIndex, slugIndex));
            })
    }
};