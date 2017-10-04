import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Pagination, Spin } from 'antd';

import PostListItem from './PostListItem';
import './PostList.css';


/*
*
* This component requires three props.
* 1. Post list (demonstrate)
* 2. The total number of posts
* 3. A function to load specified page
*
* */
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    handlePageChange(page) {
        this.setState({currentPage: page});
        this.props.loadPage(page);
    }

    render() {
        const posts = this.props.posts;
        return (
            <QueueAnim className='post_list' duration={600}>
                {posts.map((single, idx)=>{
                    if (posts[idx + 1]) {
                        return (
                            <div key={idx}>
                                <PostListItem single={single}/>
                                <hr />
                            </div>
                        )
                    } else {
                        return (<PostListItem single={single} key={idx}/>)
                    }
                })}
                <Row justify='center' type='flex'>
                    <Pagination className='pagination'
                                current={this.state.currentPage}
                                onChange={this.handlePageChange}
                                total={this.props.numberOfPosts === 0 ? 20: this.props.numberOfPosts}
                                pageSize={10}
                                key={posts.length}
                    />
                </Row>
            </QueueAnim>
        )
    }
}

export default PostList;