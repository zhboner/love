import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './PostListItem.css';

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let single = this.props.single;
        let excerpt = single.excerpt.rendered;
        let excerptObj = {__html: excerpt};

        return (
            <div className="content item">
                <h3><Link to={'/posts/' + single.slug}>{single.title.rendered}</Link></h3>
                <div dangerouslySetInnerHTML={excerptObj}/>
            </div>
        )

    }


}