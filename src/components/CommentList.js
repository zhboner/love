import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Pagination, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';

import { fetchCommentList } from '../actions/fetchCommentList';

import CommentItem from './CommentItem';
import './CommentList.css';

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        }
    }

    componentDidMount() {
        this.props.getComments(this.props.postID);
    }


    componentWillUpdate(nextProps) {
        if (this.props.postID !== nextProps.postID) {
            this.props.getComments(nextProps.postID);
        }
    }

    loadComment = (page) => {
        this.setState({page: page});
        this.props.getComments(this.props.postID, page)
    };

    render() {
        const loading = this.props.loading,
            comments = this.props.comments,
            amount = this.props.amount;

        let commentsObj = {0:null};
        comments.map((comment)=> {
            commentsObj[comment.id] = comment;
        });
        return (
            <Spin spinning={loading} size='large' className='comment_list'>
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

                    return (
                        <QueueAnim duration={600} type='bottom'>
                            {
                                comments.map((comment) => {
                                    return (
                                        <CommentItem
                                            item={comment}
                                            postID={this.props.postID}
                                            parent={commentsObj[comment.parent] || this.props.supplementaryDict[comment.parent]}
                                            key={comment.id}
                                        />
                                    )
                                })
                            }
                        </QueueAnim>
                    )
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

const mapStateToProps = (state) => {
    return {
        loading: state.comment.isFetching,
        amount: state.comment.CommentsAmount,
        comments: state.comment.content,
        supplementaryDict: state.comment.supDict
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);