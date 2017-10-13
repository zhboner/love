import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';

import PostList from './PostList';
import { fetchPostsList } from '../actions/fetchPostsList';
import './CategoryPosts.css';

class CategoryPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobWaiting: false,      // If the catIndex is pending, then delay loading posts list
            catID: 0                // store the current category id
        };
    }

    handlePageChange = (page) => {
        this.props.fetchList(page, this.state.catID);
    };

    componentWillReceiveProps(nextProps) {
        // Only do things when the catIndex is existing
        if (nextProps.catIndex) {
            // If it is when the component just mounted, fetch posts and set the flag as false
            if (this.state.jobWaiting) {
                this.setState({
                    jobWaiting: false,
                    catID: nextProps.catIndex[this.props.match.params.slug].id
                }, ()=>{
                    this.props.fetchList(1, this.state.catID);
                });
                return;
            }

            // Switch between categories.
            if (this.props.catIndex[this.props.match.params.slug].id !== nextProps.catIndex[nextProps.match.params.slug].id) {
                this.setState({
                    catID: nextProps.catIndex[nextProps.match.params.slug].id
                }, ()=>{
                    this.props.fetchList(1, this.state.catID);
                });
            }
        }
    }

    componentDidMount() {
        if (this.props.catIndex) {
            this.setState({catID: this.props.catIndex[this.props.match.params.slug].id}, ()=>{
                this.props.fetchList(1, this.state.catID)
            });
        } else {
            this.setState({jobWaiting: true})
        }
    }

    render() {
        return (
            <Spin spinning={this.props.isFetching} size='large'>
                {
                    (()=>{
                        if (this.props.catIndex) {
                            return <h2 className='category_name'>{this.props.catIndex[this.props.match.params.slug].name}</h2>
                        }
                    })()
                }
                <PostList posts={this.props.postList} numberOfPosts={this.props.postsAmount} loadPage={this.handlePageChange}/>
            </Spin>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        postsAmount: (state.category.slugIndex && state.category.slugIndex[ownProps.match.params.slug].count) || 0,
        catIndex: state.category.slugIndex,
        postList: state.postListByCategory.content,
        isFetching: state.postListByCategory.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchList: (pageNO, catID) => {
            return dispatch(fetchPostsList(pageNO, catID))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts));