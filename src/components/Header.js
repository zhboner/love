import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.info = this.props.info;
    }

    componentWillMount() {
        document.title = this.info.name;
    }

    render() {
        return (
            <div className="title">
                <Link to='/'><h1>{this.info.name}</h1></Link>
                <h2>{this.info.description}</h2>
            </div>
        )
    }
}