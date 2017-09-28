import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { fetchSinglePost, clearCurrentPost } from '../actions/fetchPost'
import Single from './Single'

class PostPage extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.clearPost();
    }

    render() {
        if (!this.props.post) {
            return (
                <Spin spinning={!this.props.post} tip='loading'/>
            )
        }

        return (
            <Single single={this.props.post}/>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        post: state.post.content,
        categories: state.category.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (slug) => {
            return dispatch(fetchSinglePost(slug))
        },
        clearPost: () => {
            return dispatch(clearCurrentPost());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);