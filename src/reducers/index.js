import {combineReducers} from 'redux';

import post from './post';
import category from './category';
import info from './info';
import postList from './postList';
import postListByCategory from './postListByCategory';
import comment from './comment'
import page from './page';
import user from './user';
import nonce from './nonce';

export default combineReducers({
    post,
    category,
    info,
    postList,
    comment,
    page,
    user,
    postListByCategory,
    nonce
});