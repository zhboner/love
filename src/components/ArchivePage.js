import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

import config from '../config';
import './ArchivePage.css';

class ScrollContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false,
            amount: 0
        }
    }

    loadMore = () => {
        this.setState((prev) => {
            return {
                page: prev.page + 1
            }
        })
    };

    setAmountofPosts = (amount) => {
        if (this.state.amount !== 0) {
            return;
        }
        this.setState({
            amount: amount
        })
    };

    setLoadingState = (state) => {
        this.setState({loading: state})
    };

    render() {
        return (
            <div>
                <ArchivePage page={this.state.page} setLoadingState={this.setLoadingState} setPostsAmount={this.setAmountofPosts}/>
                {
                    this.state.amount === 0 || this.state.amount >= 15 * this.state.page || this.state.loading ?
                        <Button type='primary' shape='circle' onClick={this.loadMore} loading={this.state.loading} icon='reload'/> :
                        ''
                }
            </div>
        )
    }
}

class ArchivePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleList: []
        };
        this.props.setLoadingState(true)
    }

    componentWillReceiveProps(nextProps) {
        this.props.setLoadingState(nextProps.titleList.pending);
        if (nextProps.titleList.fulfilled && nextProps.titleList.value !== this.props.titleList.value) {
            this.props.setPostsAmount(
                parseInt(nextProps.titleList.meta.response.headers.get('x-wp-total'))
            );
            this.setState((prevState) => {
                return {
                    titleList: prevState.titleList.concat(nextProps.titleList.value)
                }
            })
        }
    }



    render() {
        let currentYear = 0;
        return (
            <Row className='archive_page'>
            {
                this.state.titleList.map((item, idx) => {
                    const date = new Date(item.date);
                    return (
                        <div className='single'>
                            {
                                (()=>{
                                    if (date.getFullYear() !== currentYear) {
                                        currentYear = date.getFullYear();
                                        return (
                                            <Col span={6}>
                                                <p className='year'>
                                                    {currentYear}
                                                </p>
                                            </Col>
                                        )
                                    }
                                })()
                            }
                            <Col key={idx} offset={6}>
                                <p className='tit'>
                                    <Link to={'/posts/' + item.slug}>{item.title.rendered}</Link>
                                </p>
                            </Col>
                        </div>
                    )
                })
            }
            </Row>
        )

    }
}

ArchivePage = connect(props => {
    return {
        titleList: config.prefix + 'posts?per_page=15&page=' + props.page
    }
})(ArchivePage);

export default ScrollContainer;
