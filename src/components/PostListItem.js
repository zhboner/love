import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './PostListItem.css';

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.date = this.props.single.date.split('T')[0];
    }

    render() {
        let single = this.props.single;
        let excerpt = single.excerpt.rendered;
        let excerptObj = {__html: excerpt};

        return (
            <div className="content item">
                <h3><strong><Link to={'/posts/' + single.slug}>{single.title.rendered}</Link></strong></h3>
                <p className='subtitle'>{this.date}</p>
                <div dangerouslySetInnerHTML={excerptObj}/>
            </div>
        )

    }


}