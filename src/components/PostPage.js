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

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            this.props.getPost(nextProps.match.params.slug);
        }
    }

    render() {
        if (!this.props.post) {
            return (
                <Spin spinning={!this.props.post} tip='loading'/>
            )
        }

        return (
            <div>
                <Single single={this.props.post}/>
            </div>
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