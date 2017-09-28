import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { clearCurrentPage, fetchPage } from '../actions/fetchPage'
import Single from './Single'

class SinglePage extends Component {
    componentDidMount() {
        this.props.getPage(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.clearPage();
    }

    render() {
        if (!this.props.page) {
            return (
                <Spin spinning={!this.props.page} tip='loading'/>
            )
        }

        return (
            <Single single={this.props.page}/>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        page: state.page.content
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

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);