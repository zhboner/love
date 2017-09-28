import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchInformation } from './actions/info'
import './App.css';
import Main from './components/Main';


class App extends Component {
    componentDidMount() {
        this.props.fetchInfo();
    }

    render() {
        let app = '';
        if (!this.props.isFetching && this.props.info) {
            app = (
                <Main info={this.props.info}/>
            )
        } else {
            app = (
                <div>loading......</div>
            )
        }

        return app;
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.info.content,
        isFetching: state.info.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInfo: () => {
            return dispatch(fetchInformation())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
