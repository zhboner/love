import React, { Component } from 'react';

import './CommentItem.css';

class CommentItem extends Component {
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
                <div dangerouslySetInnerHTML={dangerObj}/>
            </div>
        )
    }
}

export default CommentItem;