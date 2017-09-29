import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Pagination, Row } from 'antd';

import { fetchCommentList } from '../actions/fetchCommentList';

import CommentItem from './CommentItem';
import './CommentList.css';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.loadComment = this.loadComment.bind(this);

        this.state = {
            page: 1
        }
    }

    componentDidMount() {
        this.props.getComments(this.props.postID);
    }

    loadComment(page) {
        this.setState({page: page});
        this.props.getComments(this.props.postID, page)
    }

    render() {
        const loading = this.props.loading,
            comments = this.props.comments,
            amount = this.props.amount;

        let commentsObj = {0:null};
        comments.map((comment)=> {
            commentsObj[comment.id] = comment;
        });
        return (
            <div className='comment_list'>
                <Spin spinning={loading} size='large'>
                {(() => {
                    if (loading) {
                        return <div height='200'></div>
                    } else if (comments.length === 0) {
                        return (
                            <div height='200'>
                                <p>没有评论</p>
                            </div>
                        )
                    }

                    return comments.map((comment) => {
                        let dangerObj = {__html: comment.content.rendered},
                            authorName = comment.author_name || '匿名',
                            date = comment.date.split('T');
                        const day = date[0],
                            time = date[1];
                        return (
                            <CommentItem item={comment} parent={commentsObj[comment.parent]} key={comment.id}/>
                        )
                    });
                })()}
                {(()=> {
                    if (amount > 10) {
                        return (
                            <Row className='pagination' type='flex' justify='center'>
                                <Pagination simple defaultCurrent={this.state.page} total={amount} onChange={this.loadComment}/>
                            </Row>
                        )
                    }
                })()}
            </Spin>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (postID, page) => {
            dispatch(fetchCommentList(postID, page));
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    let obj = {
        comments: [],
        loading: false,
        amount: 0
    };
    if (state.comment[ownProps.postID] && state.comment[ownProps.postID].content) {
        obj.comments = state.comment[ownProps.postID].content
    }
    if (state.comment[ownProps.postID] && state.comment[ownProps.postID].isFetching) {
        obj.loading = state.comment[ownProps.postID].isFetching
    }
    if (state.comment[ownProps.postID] && state.comment[ownProps.postID].CommentsAmount) {
        obj.amount = state.comment[ownProps.postID].CommentsAmount
    }

    return obj;
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);