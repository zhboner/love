import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import PostList from './PostList';
import { saveTheAmountOfPosts } from '../actions/fetchPost';
import { fetchPostsList } from '../actions/fetchPostsList';
import { refreshIndex } from '../actions/sync';
import './PostListContainer.css';

class PostListContainer extends Component {
    componentWillReceiveProps(nextProps) {
        this.refreshList(nextProps.refresh);
    }

    refreshList = (refresh) => {
        if (refresh) {
            this.props.refreshed();
            if (this.props.currentPage !== 1) {
                this.props.getPostsList();
            }
        }
    };

    componentDidMount() {
        let refresh = this.props.refresh === null ? true : this.props.refresh;

        this.refreshList(refresh);
    }

    render() {
        const posts = this.props.posts;
        return (
            <Spin className='post_list_container' spinning={this.props.isFetching || this.props.isFetchingCategory} size='large'>
                <PostList posts={posts} numberOfPosts={this.props.numberOfPosts} loadPage={this.props.getPostsList}/>
            </Spin>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        numberOfPosts: state.info.postAmount,
        posts: state.postList.content,
        isFetching: state.postList.isFetching,
        refresh: state.postList.refresh,
        currentPage: state.postList.pageNO,

        isFetchingCategory: state.category.isFetching

    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        saveTheAmountOfPosts: (amount) => {
            dispatch(saveTheAmountOfPosts(amount))
        },
        getPostsList: (pageNo = 1) => {
            dispatch(fetchPostsList(pageNo))
        },
        refreshed: () => {
            dispatch(refreshIndex(false))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
