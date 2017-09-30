import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col} from 'antd';

import PrimaryMenu from './PrimaryMenu';
import './Header.css';
import {refreshIndex} from "../actions/sync";


class Header extends Component {
    constructor(props) {
        super(props);
        this.info = this.props.info;
    }

    componentWillMount() {
        document.title = this.info.name;
    }

    render() {
        return (
            <Row className="title" type='flex' justify='space-between' align="bottom">
                <Col>
                    <Link to='/' onClick={this.props.refreshPostList}><h1>{this.info.name}</h1></Link>
                    <h2>{this.info.description}</h2>
                </Col>
                <Col>
                    <PrimaryMenu/>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshPostList: () => {
            dispatch(refreshIndex(true))
        }
    }
};

export default connect(null, mapDispatchToProps)(Header);