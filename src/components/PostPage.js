import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSinglePost, clearCurrentPost } from '../actions/fetchPost'
import './PostPage.css';
import CommentList from './CommentList';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    componentDidMount() {
        this.props.getPost(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.clearPost();
    }

    render() {
        if (!this.props.post) {
            return (
                <div>loading...</div>
            )
        }

        let date = this.props.post.date.split('T')[0];

        let content = {__html: this.props.post.content.rendered};

        return (
            <div className="content">
                <h3>{this.props.post.title.rendered}</h3>
                <p className='subtitle'>
                    {date}
                    <br/>

                </p>
                <div dangerouslySetInnerHTML={content}/>
                <CommentList postID={this.props.post.id}/>
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