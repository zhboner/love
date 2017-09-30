import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';

import PostListItem from './PostListItem';
import './PostList.css';

class PostList extends Component {
    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        const posts = this.props.posts;
        return (
            <QueueAnim className='post_list' duration={600}>
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
            </QueueAnim>
        )
    }
}

export default PostList;