import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './Header.css';


export default class Header extends Component {
    render() {
        return (
            <div className="title">
                <Link to='/'><h1>{this.props.info.name}</h1></Link>
                <h2>{this.props.info.description}</h2>
            </div>
        )
    }
}