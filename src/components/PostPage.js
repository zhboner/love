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
        // Find the post
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

        let date = this.state.post.date.split('T')[0];

        let content = {__html: this.state.post.content.rendered};

        return (
            <div className="content">
                <h3>{this.state.post.title.rendered}</h3>
                <p className='subtitle'>
                    {date}
                </p>
                <div dangerouslySetInnerHTML={content}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        post: state.post.postList,
        catDic: state.category.categories
    }
};

export default connect(mapStateToProps)(PostPage);