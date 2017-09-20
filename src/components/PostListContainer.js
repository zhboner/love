import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { getPosts } from '../services/posts'
import { getCategoriesList } from '../services/categories';

import PostListItem from './PostListItem';
import { savePosts, saveTheAmountOfPosts, saveCategories } from '../actions'

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
        this.loadCategories = this.loadCategories.bind(this);
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

                this.props.persistCategories(response.data);
                this.props.persistTheAmountOfPosts(numberOfPosts);

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

    loadCategories() {
        getCategoriesList().then((response)=>{
            console.log(response.data)
        })
    }

    extractExcerpt(postList) {
        postList.map((single)=>{
            let content = single.content.rendered;
            let splitContent = content.split(new RegExp(/<p.*><!--more--><\/p>/, 'i'));
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
        this.loadCategories();
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

const mapDispatchToProps = (dispatch)=>{
    return {
        persistCategories: (categories) => {
            dispatch(saveCategories(categories))
        },
        persistPosts: (posts) => {
            dispatch(savePosts(posts))
        },
        persistTheAmountOfPosts: (amount) => {
            dispatch(saveTheAmountOfPosts(amount))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
