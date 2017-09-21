import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { getPosts, extractExcerpt } from '../services/posts'
import { getCategoriesList } from '../services/categories';

import PostListItem from './PostListItem';
import { savePosts, saveTheAmountOfPosts, saveCategories } from '../actions'

class PostListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            posts: [],
            numberOfPosts: null,
            categories: {}
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
                console.log(response.data);

                this.props.persistPosts(response.data);
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
            console.log(response.data);
            let dict = {};
            response.data.map((cat) => {
                dict[cat.id] = cat.name;
            });



            this.props.persistCategories(dict);
            this.setState({
                categories: dict
            })
        })
    }

    extractExcerpt(postList) {
        postList.map((single)=>{
            let content = single.content.rendered;
            let result = extractExcerpt(content);
            single.excerpt.rendered = result.excerpt;
            single.content.rendered = result.content;
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

        // Check categories in store
        if (this.props.categories === {}) {
            this.setState({
                categories: this.props.categories
            })
        } else {
            this.loadCategories();
        }
    }

    render() {
        return (
            <div>
                {this.state.posts.map((single)=>{
                    return (
                        <PostListItem single={single} key={single.id} categories={this.state.categories}/>
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
        posts: state.postList,
        categories: state.categories
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
