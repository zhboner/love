import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCommentList } from '../actions/fetchCommentList';

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getComments(this.props.postID);
    }

    render() {
        return (
            <div></div>
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
    return {
        comments: state.comment[ownProps.postID] && state.comment[ownProps.postID].content
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);