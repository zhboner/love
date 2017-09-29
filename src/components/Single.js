import React, { Component } from 'react';
import { Spin } from 'antd';

import './Single.css';
import CommentList from './CommentList';
import CommentTextArea from './CommentTextArea';

export default class PostPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.props.single) {
            return (
                <Spin spinning={!this.props.single} tip='loading'/>
            )
        }

        let date = this.props.single.date.split('T')[0];

        let content = {__html: this.props.single.content.rendered};

        return (
            <div>
                <div className="content">
                    <h3>{this.props.single.title.rendered}</h3>
                    <p className='subtitle'>
                        {date}
                        <br/>

                    </p>
                    <div dangerouslySetInnerHTML={content}/>
                </div>
                <CommentTextArea postID={this.props.single.id}/>
                <CommentList postID={this.props.single.id}/>
            </div>
        )
    }
}