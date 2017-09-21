import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Pagination  } from 'antd';

import { getPosts, extractExcerpt } from '../services/posts'

import PostListItem from './PostListItem';
import { savePosts, saveTheAmountOfPosts } from '../actions'

class PostListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            posts: [],
            numberOfPosts: null,
            categories: this.props.categories
        };

        this.loadPosts = this.loadPosts.bind(this);
        this.extractExcerpt = this.extractExcerpt.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    loadPosts() {
        if (this.state.posts.length / 10 < this.state.pageNO) {
            if (this.state.numberOfPosts && this.state.numberOfPosts <= this.state.posts.length) {
                return;
            }

            getPosts().then((response)=>{
                console.log(response);
                const numberOfPosts = parseInt(response.headers['x-wp-total'], 10);
                this.extractExcerpt(response.data);
                console.log(response.data);

                this.props.persistPosts(response.data);
                this.props.persistTheAmountOfPosts(numberOfPosts);

                this.setState({
                        posts: response.data,
                        numberOfPosts: numberOfPosts
                })
            }, (err)=>{
                console.log(err);
            })
        }
    }

    extractExcerpt(postList) {
        postList.map((single)=>{
            let content = single.content.rendered;
            let result = extractExcerpt(content);
            single.excerpt.rendered = result.excerpt;
            single.content.rendered = result.content;
        })
    }

    handlePageChange(page) {
        getPosts(page).then((response)=>{
            this.extractExcerpt(response.data);
            this.props.persistPosts(response.data);
            this.setState({
                posts: response.data
            })
        })
    }

    componentWillMount() {

        // Check posts in store. If it is available, load it directly
        if (this.props.posts.length !== 0) {
            this.setState({
                pageNO: this.props.pageNO,
                posts: this.props.posts,
                numberOfPosts: this.props.numberOfPosts
            });
        } else {
            this.loadPosts();
        }
    }

    render() {
        return (
            <div>
                {this.state.posts.map((single)=>{
                    return (
                        <PostListItem single={single} key={single.id}/>
                    )
                })}
                <Pagination onChange={this.handlePageChange} total={this.state.numberOfPosts} pageSize={10}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        pageNO: state.pageNO,
        numberOfPosts: state.postAmount,
        posts: state.postList,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        persistPosts: (posts) => {
            dispatch(savePosts(posts))
        },
        persistTheAmountOfPosts: (amount) => {
            dispatch(saveTheAmountOfPosts(amount))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
