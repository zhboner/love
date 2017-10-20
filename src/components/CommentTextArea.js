import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Form, Button, Input, message, Icon, Row, Col } from 'antd';

import { postComment } from '../actions/postComment';
import { saveUserName, saveUserEmail, saveUserURL} from '../actions/sync';
import { getNonce } from '../actions/getNonce';
import './CommentTextArea.css';

class CommentTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showedMessage: true
        };
    }

    componentWillReceiveProps(nextProps) {
        this.showCommentStatus(nextProps);
    }

    componentDidMount() {
        if (!this.props.nonce.content) {
            this.props.fetchNonce();
        }
    }

    handleSubmit = (e) => {
        this.props.form.validateFields(err => {
            if (err) return;

            this.sendComment();
            this.setCookie();
        });
    };

    // Show global comment status message
    showCommentStatus = (nextProps) => {
        const { success, fail, isPosting} = nextProps;
        if (!success && !fail && !isPosting)
            return;

        if (fail && !this.state.showedMessage) {
            message.error('评论失败\n' + nextProps.error_message, 5);
            this.setState({
                showedMessage: true
            })
        }
        else if (success && !this.state.showedMessage) {
            message.success('评论成功');
            this.props.form.resetFields(['comment']);
            this.setState({
                showedMessage: true
            })
        }
    };

    checkNonce = (nextProps) => {
        if (nextProps.nonce.isFetching || nextProps.nonce.content !== null) {
            return;
        }
        message.error('Please refresh browser to post comments.', 5)
    };

    // Send comment
    sendComment = () => {
        const comment = this.props.form.getFieldsValue();
        this.props.postComment({
                content: comment.comment,
                userID: this.props.userID,
                nonce: this.props.nonce.content,
                author_name: comment.author,
                author_email: comment.email,
                author_url: comment.url
            }, this.props.postID,
            this.props.parentID || 0
        );
        this.setState({showedMessage: false});
    };

    // Set cookie when author is not blank.
    setCookie = () => {
        const comment = this.props.form.getFieldsValue();
        const {author, email, url} = comment;
        const {cookies} = this.props;
        const option = {
            path: '/'
        };

        if (author) {
            cookies.set('author', author, option);
            this.props.saveAuthorName(author);
        }
        if (email) {
            cookies.set('email', email, option);
            this.props.saveUserEmail(email);
        }
        if (email) {
            cookies.set('url', url, option);
            this.props.saveUserURL(url);
        }
    };

    render() {
        const TextArea = Input.TextArea;
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout='vertical' className='CommentTextArea'>

                <FormItem>
                    {getFieldDecorator('comment', {
                        rules:[{type: 'string', required: true, whitespace: true, message: '请输入评论'}]
                    })(
                            <TextArea placeholder='评论' rows={4}/>
                        )}
                </FormItem>
                {
                    (() => {
                        if (!this.props.userID) {
                            return (
                                <Row>
                                    <Col md={6} sm={6} xs={24}>
                                        <FormItem>
                                            {getFieldDecorator('author', {
                                                rules: [{type: 'string', message: '请输入昵称'}]
                                            })(
                                                <Input placeholder='昵称' addonBefore={<Icon type='user'/>}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col md={{span: 6, offset: 3}} sm={{span: 6, offset: 3}} xs={24}>
                                        <FormItem>
                                            {getFieldDecorator('email', {
                                                rules: [{type: 'email', message: '请输入有效的email'}]
                                            })(
                                                <Input placeholder='Email' addonBefore={<Icon type='mail'/>}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col md={{span: 6, offset: 3}} sm={{span: 6, offset: 3}} xs={24}>
                                        <FormItem>
                                            {getFieldDecorator('url', {
                                                rules: [{type: 'url', message: '请输入有效的url'}]
                                            })(
                                                <Input placeholder='Website' addonBefore={<Icon type='home'/>}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            )
                        }
                    })()
                }
                <Row type='flex' justify='space-between'>
                    <div>
                        {
                            (() => {
                                if (this.props.userID) {
                                    return (
                                        <p>以 {this.props.userName} 的身份评论</p>
                                    )
                                }
                            })()
                        }
                    </div>
                    <FormItem>
                        <Button type='default' onClick={this.handleSubmit} loading={this.props.isPosting}>发布</Button>
                    </FormItem>
                </Row>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (comment, postID, parentID) => {
            return dispatch(postComment(comment, postID, parentID));
        },
        saveAuthorName: (name) => {
            return dispatch(saveUserName(name));
        },
        saveUserEmail: (email) => {
            return dispatch(saveUserEmail(email));
        },
        saveUserURL: (url) => {
            return dispatch(saveUserURL(url));
        },
        fetchNonce: () => {
            return dispatch(getNonce());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        // Comment info
        isPosting: state.comment.isPosting,
        success: state.comment.success,
        fail: state.comment.fail,
        error_message: state.comment.error_message,

        // User info
        userID: state.user.id,
        userName: state.user.userName,
        userEmail: state.user.userEmail,
        userURL: state.user.userURL,

        //Nonce
        nonce: state.nonce,
    }
};

// Load visitor info from store and set in the form
const loadVisitorInfo = (props) => {
    const { userName, userEmail, userURL } = props;
    return {
        'author': {value: userName},
        'email': {value: userEmail || ''},
        'url': {value: userURL || ''}
    }
};

export default withCookies(
    connect(mapStateToProps, mapDispatchToProps)(
        Form.create({
            mapPropsToFields: loadVisitorInfo
        })(CommentTextArea)
    )
);