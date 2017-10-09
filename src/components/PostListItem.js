import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import './PostListItem.css';
import './content.css';

class PostListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.date = this.props.single.date.split('T')[0];

        let single = this.props.single;
        let excerpt = single.excerpt.rendered;
        let excerptObj = {__html: excerpt};

        return (
            <div className="item">
                <h3><strong><Link to={'/posts/' + single.slug}>{single.title.rendered}</Link></strong></h3>
                <div className='subtitle'>
                    {this.date}
                    &nbsp;
                    &nbsp;
                    {
                        (() => {
                            let tmp = 0;
                            return this.props.single.categories.map((cat) => {
                                tmp += 1;
                                if (!this.props.categories) {
                                    return <Spin size='small' key={tmp}/>
                                }

                                return (
                                    <Link to={'/posts/category/' + this.props.categories[cat].slug}
                                          key={this.props.categories[cat].id}
                                          className='subtitle'
                                    >
                                        {this.props.categories[cat].name}
                                    </Link>
                                )

                            });
                        })()
                    }
                </div>
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