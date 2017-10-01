import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import './CommentItem.css';
import CommentTextArea from './CommentTextArea';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingCommentTextArea: false
        };
        this.handleReplyButtonClick = this.handleReplyButtonClick.bind(this);
    }

    handleReplyButtonClick(e) {
        this.setState(prevState => {
            return {showingCommentTextArea: !prevState.showingCommentTextArea}
        });
    }

    render () {
        let comment = this.props.item,
            parent = this.props.parent;

        let dangerObj = {__html: comment.content.rendered},
            authorName = comment.author_name || '匿名',
            date = comment.date.split('T');
        const day = date[0],
            time = date[1];

        let reply = '';
        if (parent) {
            let parent_name = parent.author_name || '匿名';
            reply = (<p className='re'><Icon type="right-square" /> {parent_name}</p>)
        }

        let textArea = (<CommentTextArea parentID={comment.id} postID={this.props.postID}/>),
            replyButton = (
                <Button className='reply_button' type='ghost' size='small' htmlType='button' onClick={this.handleReplyButtonClick} icon='enter'>
                    {this.state.showingCommentTextArea ? '取消' : '回复'}
                </Button>
            );

        return (
            <div className='comment_single'>
                <div className='top'>
                    <div className='avatar'>
                        <img src={comment.author_avatar_urls[48]}/>
                    </div>
                    <div className='info'>
                        <p>
                            <strong>{authorName}</strong>
                            <br/>
                            {day} {time}
                        </p>
                    </div>
                </div>
                {reply}
                <div className='comment_body'>
                    <div className='comment_content' dangerouslySetInnerHTML={dangerObj}/>
                    {replyButton}
                </div>
                {this.state.showingCommentTextArea ? textArea: ''}
            </div>
        )
    }
}

export default CommentItem;