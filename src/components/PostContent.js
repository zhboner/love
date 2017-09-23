/*

* This component is designed to uniform the post list and post page.
* Only when it is finished, will replace the "post list item"
*
* */

import React from 'react';
import { connect } from 'react-redux';

const PostContent = (props) => {
    // TODO: 1. Add the content object for inner html render. 2. Show excerpt or content

    let {post, categories} = props;
    let content = post.content.rendered;
    let categories = '';

    post.categories.map((cat) => {
        if (tmp !== 0) {
            categories += ' ';
        }
        categories += categories[cat];
        tmp += 1;
    });

    return (
        <div className="content">
            <h3>{post.title.rendered}</h3>
            <p className='subtitle'>
                {date}
                <br/>
                {categories}
            </p>
            <div dangerouslySetInnerHTML={contentObj}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        categories: state.category.categories
    }
};

export default connect(mapStateToProps)(PostContent);

