import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input } from 'antd';


import { postComment } from '../actions/postComment';

class CommentTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({
            commentText: e.target.value
        })
    }

    handleSubmit(e) {
        console.log('submit');
        this.props.postComment({
            content: this.state.commentText
        }, this.props.postID, this.props.parentID || 0);
    }

    render() {
        const TextArea = Input.TextArea;
        const FormItem = Form.Item;
        console.log(this.props.postID);
        return (
            <Form layout='vertical'>
                <FormItem>
                    <TextArea value={this.state.commentText} onChange={this.handleInput}/>
                </FormItem>
                <FormItem>
                    <Button type='submit' onClick={this.handleSubmit} loading={this.props.isPosting}>POST</Button>
                </FormItem>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (comment, postID, parentID) => {
            return dispatch(postComment(comment, postID, parentID));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        postID: state.post.content.id,
        isPosting: state.comment.isPosting
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTextArea);