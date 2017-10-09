import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';

import { fetchSinglePost, clearCurrentPost } from '../actions/fetchPost'
import Single from './Single'

class PostPage extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.slug, this.props.history);
    }

    componentWillUnmount() {
        this.props.clearPost();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            this.props.getPost(nextProps.match.params.slug, this.props.history);
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
        getPost: (slug, routerHistory) => {
            return dispatch(fetchSinglePost(slug, routerHistory))
        },
        clearPost: () => {
            return dispatch(clearCurrentPost());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));