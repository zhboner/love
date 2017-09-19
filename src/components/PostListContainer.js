import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import {getPosts} from '../services/Posts'

import PostListItem from './PostListItem';
import { savePosts, saveTheAmountOfPosts } from '../actions'

class PostListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            posts: [],
            numberOfPosts: null
        };

        this.loadPosts = this.loadPosts.bind(this);
        this.extractExcerpt = this.extractExcerpt.bind(this);
    }

    loadPosts() {
        if (this.state.posts.length / 10 < this.state.pageNO) {
            if (this.state.numberOfPosts && this.state.numberOfPosts <= this.state.posts.length) {
                return;
            }

            getPosts(this.state.pageNO).then((response)=>{
                console.log(response);
                const numberOfPosts = parseInt(response.headers['x-wp-total'], 10);
                this.extractExcerpt(response.data);

                this.props.dispatch(savePosts(response.data));
                this.props.dispatch(saveTheAmountOfPosts(numberOfPosts));

                this.setState((prevState)=>{
                    return {
                        posts: prevState.posts.concat(response.data),
                        numberOfPosts: numberOfPosts
                    };
                })
            }, (err)=>{
                console.log(err);
            })
        }
    }

    extractExcerpt(postList) {
        postList.map((single)=>{
            let content = single.content.rendered;
            let splitContent = content.split('<!--more-->');
            single.excerpt.rendered = splitContent[0];
            single.content.rendered = splitContent[0].concat(splitContent[1]);
        })
    }

    componentWillMount() {
        if (this.props.posts.length !== 0) {
            this.setState({
                pageNO: this.props.pageNO,
                posts: this.props.posts,
                numberOfPosts: this.props.numberOfPosts
            });
            return;
        }
        this.loadPosts();
    }

    render() {
        return (
            <div>
                {this.state.posts.map((single)=>{
                    return (
                        <PostListItem single={single} key={single.id}/>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        pageNO: state.pageNO,
        numberOfPosts: state.postAmount,
        posts: state.postList
    }
};

export default connect(mapStateToProps)(PostListContainer)
