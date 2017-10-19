import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import config from '../config';
import './ArchivePage.css';

class ScrollContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false
        }
    }

    loadMore = () => {
        this.setState((prev) => {
            return {
                page: prev.page + 1
            }
        })
    };

    setLoadingState = (state) => {
        this.setState({loading: state})
    };

    render() {
        return (
            <div>
                <ArchivePage page={this.state.page} setLoadingState={this.setLoadingState}/>
                <Button type='circle' onClick={this.loadMore} loading={this.state.loading}>More</Button>
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
            this.setState((prevState) => {
                return {
                    titleList: prevState.titleList.concat(nextProps.titleList.value)
                }
            })
        }
    }



    render() {

        return (
            <div className='archive_page'>
            {
                (()=>{
                    let currentYear = 0;
                    return this.state.titleList.map((item, idx) => {
                        const date = new Date(item.date);
                        if (date.getFullYear() !== currentYear) {
                            currentYear = date.getFullYear();
                            return (
                                <div className='item' key={idx}>
                                    <p>{currentYear}</p>
                                    <p>
                                        <Link to={'/posts/' + item.slug}>{item.title.rendered}</Link>
                                    </p>
                                </div>
                            )
                        }
                        return (
                            <div className='item' key={idx}>
                                <p>
                                    <Link to={'/posts/' + item.slug}>{item.title.rendered}</Link>
                                </p>
                            </div>
                        )
                    })

                })()
            }
            </div>
        )

    }
}

ArchivePage = connect(props => {
    return {
        titleList: config.prefix + 'posts?per_page=15&page=' + props.page
    }
})(ArchivePage);

export default ScrollContainer;
