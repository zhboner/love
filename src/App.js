import React, { Component } from 'react';


import { getSettings } from './services/Information';
import './App.css';
import Main from './components/Main';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            postList: 123
        }
    }

    componentWillMount() {
        getSettings().then((response)=>{
            console.log(response);
            this.setState({
                info: response.data
            })
        })
    }

    render() {
        let app = '';
        if (this.state.info && this.state.postList) {
            app = (
                <Main info={this.state.info}/>
            )
        } else {
            app = (
                <div>loading......</div>
            )
        }

        return app;
    }
}

export default App;
