import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Pagination, Spin  } from 'antd';

import PostList from './PostList';
import { saveTheAmountOfPosts } from '../actions/fetchPost'
import { fetchPostsList } from '../actions/fetchPostsList'
import './PostListContainer.css'

class PostListContainer extends Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(page) {
        this.props.getPostsList(page);
    }

    componentDidMount() {
        this.props.getPostsList();
    }

    render() {
        const posts = this.props.posts;
        return (
            <Spin className='post_list_container' spinning={this.props.isFetching}>
                <PostList posts={posts}/>
                <Row justify='center' type='flex'>
                    <Pagination className='pagination'
                                defaultCurrent={1}
                                onChange={this.handlePageChange}
                                total={this.props.numberOfPosts === 0 ? 20: this.props.numberOfPosts}
                                pageSize={10}
                    />
                </Row>
            </Spin>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        numberOfPosts: state.info.postAmount,
        posts: state.postList.content,
        isFetching: state.postList.isFetching
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        saveTheAmountOfPosts: (amount) => {
            dispatch(saveTheAmountOfPosts(amount))
        },
        getPostsList: (pageNo = 1) => {
            dispatch(fetchPostsList(pageNo))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
