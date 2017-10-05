import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './PostListItem.css';
import './content.css';

class PostListItem extends Component {
    constructor(props) {
        super(props);

        this.date = this.props.single.date.split('T')[0];
    }

    render() {
        let single = this.props.single;
        let excerpt = single.excerpt.rendered;
        let excerptObj = {__html: excerpt};

        let categories = '';
        let tmp = 0;

        this.props.single.categories.map((cat) => {
            if (tmp !== 0) {
                categories += ' ';
            }
            categories += this.props.categories[cat].name;
            tmp += 1;
        });

        return (
            <div className="item">
                <h3><strong><Link to={'/posts/' + single.slug}>{single.title.rendered}</Link></strong></h3>
                <p className='subtitle'>
                    {this.date}
                    <br/>
                    {
                        (() => {
                            return this.props.single.categories.map((cat) => {
                                return (
                                    <Link to={'/posts/category/' + this.props.categories[cat].slug} key={this.props.categories[cat].id}>
                                        {this.props.categories[cat].name}
                                    </Link>
                                )

                            });
                        })()
                    }
                </p>
                <div className='content' dangerouslySetInnerHTML={excerptObj}/>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category.idIndex,
    }
};

export default connect(mapStateToProps)(PostListItem);