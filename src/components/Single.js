import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

import './Single.css';
import './content.css';
import CommentList from './CommentList';
import CommentTextArea from './CommentTextArea';

export default class PostPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.props.single) {
            return (
                <p>你来到了一片荒野</p>
            )
        }

        let date = this.props.single.date.split('T')[0];

        let content = {__html: this.props.single.content.rendered};

        return (
            <QueueAnim duration={600}>
                <div className="single" key={1}>
                    <h3>{this.props.single.title.rendered}</h3>
                    <p className='subtitle'>
                        {date}
                        <br/>

                    </p>
                    <div className='content' dangerouslySetInnerHTML={content}/>
                </div>
                <CommentTextArea postID={this.props.single.id}/>
                <CommentList postID={this.props.single.id}/>
            </QueueAnim>
        )
    }
}