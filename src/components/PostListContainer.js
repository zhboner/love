import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Pagination  } from 'antd';

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
            <div className='post_list_container'>
                <PostList posts={posts}/>
                <Row justify='center' type='flex'>
                    <Pagination className='pagination' onChange={this.handlePageChange} total={this.props.numberOfPosts} pageSize={10}/>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        numberOfPosts: state.info.postAmount,
        posts: state.postList.content,
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
