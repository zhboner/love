import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import PostList from './PostList';
import { fetchPostsList } from '../actions/fetchPostsList';

class CategoryPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobWaiting: false,      // If the catIndex is pending, then delay loading posts list
            catID: 0                // store the current category id
        };
    }

    handlePageChange = (page) => {
        this.props.fetchList(page, this.state.catID);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.catIndex && this.state.jobWaiting) {
            this.setState({
                jobWaiting: false,
                catID: nextProps.catIndex[this.props.match.params.slug].id
            }, ()=>{
                this.props.fetchList(1, this.state.catID);
            });
        }
    }

    componentDidMount() {
        if (this.props.catIndex) {
            this.setState({catID: this.props.catIndex[this.props.match.params.slug].id}, ()=>{
                this.props.fetchList(1, this.state.catID)
            });
        } else {
            this.setState({jobWaiting: true})
        }
    }

    render() {
        return (
            <Spin spinning={this.props.isFetching} size='large'>
                <PostList posts={this.props.postList} numberOfPosts={this.props.postsAmount} loadPage={this.handlePageChange}/>
            </Spin>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        postsAmount: (state.category.slugIndex && state.category.slugIndex[ownProps.match.params.slug].count) || 0,
        catIndex: state.category.slugIndex,
        postList: state.postListByCategory.content,
        isFetching: state.postListByCategory.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchList: (pageNO, catID) => {
            return dispatch(fetchPostsList(pageNO, catID))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts);