import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input } from 'antd';


import { postComment } from '../actions/postComment';
import { fetchCommentList } from '../actions/fetchCommentList';


class CommentTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.props.form.validateFields(err => {
            if (err) return;

            const comment = this.props.form.getFieldsValue();
            this.props.postComment({
                content: comment.comment,
                author_name: comment.author,
                author_email: comment.email
            }, this.props.postID,
                this.props.parentID || 0
            );
        });
    }

    render() {
        const TextArea = Input.TextArea;
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout='vertical'>

                <FormItem>
                    {getFieldDecorator('comment', {
                        rules:[{type: 'string', required: true, whitespace: true, message: '请输入评论'}]
                    })(
                            <TextArea placeholder='评论' rows={4}/>
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('author', {
                        rules: [{type: 'string', message: '请输入昵称'}]
                    })(
                        <Input placeholder='昵称'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{type: 'email', message: '请输入有效的email'}]
                    })(
                        <Input placeholder='Email'/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type='submit' onClick={this.handleSubmit} loading={this.props.isPosting}>发布</Button>
                </FormItem>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (comment, postID, parentID) => {
            return dispatch(postComment(comment, postID, parentID));
        },
        getComments: (postID) => {
            dispatch(fetchCommentList(postID));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        postID: state.post.content.id,
        isPosting: state.comment.isPosting
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(CommentTextArea));