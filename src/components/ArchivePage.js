import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import Infinite from 'react-infinite';
import { Link } from 'react-router-dom';

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
        this.setState({
            loading: state
        })
    };

    render() {
        return (
            <Infinite
                useWindowAsScrollContainer
                elementHeight={window.innerHeight}
                infiniteLoadBeginEdgeOffset={100}
                onInfiniteLoad={this.loadMore}
            >
                <ArchivePage page={this.state.page} setLoadingState={this.setLoadingState}/>
            </Infinite>
        )
    }
}

class ArchivePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleList: []
        }
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
        const {titleList} = this.props;
        return (
            <div className='archive_page'>
            {
                this.state.titleList.map((item, idx) => {
                    return (
                        <div className='item' key={idx}>
                            <p>
                                <Link to={'/posts/' + item.slug}>{item.title.rendered}</Link>
                            </p>
                        </div>
                    )
                })
            }
            </div>
        )

    }
}

ArchivePage = connect(props => {
    return {
        titleList: config.prefix + 'posts?per_page=20&page=' + props.page
    }
})(ArchivePage);

export default ScrollContainer;
