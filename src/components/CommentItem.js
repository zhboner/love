import React, { Component } from 'react';
import { Button } from 'antd';

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
            reply = (<p className='re'>Re: {parent_name}</p>)
        }

        let textArea = (<CommentTextArea parentID={comment.id}/>),
            replyButton = (
                <Button type='ghost' size='small' htmlType='button' onClick={this.handleReplyButtonClick} icon='enter'>
                    {this.state.showingCommentTextArea ? 'Cancel' : 'Reply'}
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
                    {replyButton}
                </div>
                {reply}
                <div dangerouslySetInnerHTML={dangerObj}/>
                {this.state.showingCommentTextArea ? textArea: ''}
            </div>
        )
    }
}

export default CommentItem;