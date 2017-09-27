import React, {Component} from 'react';

import PostListItem from './PostListItem';
import './PostList.css';

const PostList = (props) => {
    const posts = props.posts;
    return (
        <div className='post_list'>
            {posts.map((single, idx)=>{
                if (posts[idx + 1]) {
                    return (
                        <div key={single.id}>
                            <PostListItem single={single}/>
                            <hr />
                        </div>
                    )
                } else {
                    return (<PostListItem single={single} key={single.id}/>)
                }
            })}
        </div>
    )
};

export default PostList;