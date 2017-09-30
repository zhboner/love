import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { clearCurrentPage, fetchPage } from '../actions/fetchPage'
import Single from './Single'

class PagePage extends Component {
    componentDidMount() {
        this.props.getPage(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.clearPage();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            this.props.getPage(nextProps.match.params.slug);
        }
    }

    render() {
        if (!this.props.page && this.props.isFetching) {
            return (
                <Spin spinning={!this.props.page} tip='loading'/>
            )
        }

        return (
            <Spin spinning={this.props.isFetching}>
                <Single single={this.props.page}/>
            </Spin>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        page: state.page.content,
        isFetching: state.page.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPage: (slug) => {
            return dispatch(fetchPage(slug))
        },
        clearPage: () => {
            return dispatch(clearCurrentPage());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePage);