import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { fetchCommentList } from '../actions/fetchCommentList';

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getComments(this.props.postID);
    }

    render() {
        const loading = this.props.loading,
            comments = this.props.comments;
        return (
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
                        return (<div key={comment.id}>
                            <p>
                                <strong>{authorName}</strong>
                                <br/>
                                {day} {time}
                            </p>
                            <div dangerouslySetInnerHTML={dangerObj}/>
                        </div>)
                    })

                })()}
            </Spin>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (postID) => {
            dispatch(fetchCommentList(postID));
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    let obj = {
        comments: [],
        loading: false
    };
    if (state.comment[ownProps.postID] && state.comment[ownProps.postID].content) {
        obj.comments = state.comment[ownProps.postID].content
    }
    if (state.comment[ownProps.postID] && state.comment[ownProps.postID].isFetching) {
        obj.loading = state.comment[ownProps.postID].isFetching
    }

    return obj;
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);