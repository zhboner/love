import React, { Component } from 'react';
import { connect } from 'react-redux';

import { findPostBySlug } from '../services/posts';
import './PostPage.css';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    componentWillMount() {
        const slug = this.props.match.params.slug;
        findPostBySlug(slug, this.props.post).then(
            (result) => {
                this.setState({
                    post: result
                })
            }), (e) => {
            console.log(e)
        }
    }

    render() {
        if (!this.state.post) {
            return (
                <div>loading...</div>
            )
        }

        let content = {__html: this.state.post.content.rendered};

        return (
            <div className="content">
                <h3>{this.state.post.title.rendered}</h3>
                <div dangerouslySetInnerHTML={content}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        post: state.postList
    }
};

export default connect(mapStateToProps)(PostPage);