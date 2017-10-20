import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import { fetchInformation } from './actions/info'
import { saveUserID, saveUserName, saveUserURL, saveUserEmail, saveNonce } from './actions/sync';
import { getNonce } from './actions/getNonce';
import './App.css';
import Main from './components/Main';


/*
*
*   This component will check all blog info and save them into the redux store.
*
* */
class App extends Component {
    componentWillMount() {
        this.info = null;
        const { cookies } = this.props;

        // If find object from wordpress, directly use this.
        if (window.RT_API) {
            this.info = {
                name: window.RT_API.siteName,
                description: window.RT_API.siteDescription
            };

            // If the visitor is a user, now only me.
            if (window.RT_API.current_user.ID) {
                this.props.saveUserID(window.RT_API.current_user.ID);
                this.props.saveUserName(window.RT_API.current_user.data.display_name);
                // this.props.saveNonce(window.RT_API.nonce);
            } else {
                // Try to load cookie

                this.props.saveUserName(cookies.get('author') || null);
                this.props.saveUserEmail(cookies.get('email') || null);
                this.props.saveUserURL(cookies.get('url') || null);
            }
        } else {        // Otherwise, load from /wp-json. A async request will be sent.
            this.props.fetchInfo();

            this.props.saveUserName(cookies.get('author') || null);
            this.props.saveUserEmail(cookies.get('email') || null);
            this.props.saveUserURL(cookies.get('url') || null);
        }
    }

    componentDidMount() {
        this.props.fetchNonce();
    }

    render() {
        let app = '';

        if (this.info) {
            app = (
                <Main info={this.info}/>
            )
        }
        else if (!this.props.isFetching && this.props.info) {
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
            return dispatch(fetchInformation());
        },
        fetchNonce: () => {
            return dispatch(getNonce());
        },
        saveUserID: (user) => {
            return dispatch(saveUserID(user));
        },
        saveNonce: (nonce) => {
            return dispatch(saveNonce(nonce));
        },
        saveUserName: (name) => {
            return dispatch(saveUserName(name));
        },
        saveUserURL: (url) => {
            return dispatch(saveUserURL(url));
        },
        saveUserEmail: (email) => {
            return dispatch(saveUserEmail(email));
        }
    }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));
