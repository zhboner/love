import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import './Main.css';


import Header from './Header';
import PostListContainer from './PostListContainer';
import PostPage from './PostPage';

export default class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Row className='header'>
                        <Col span={12} offset={6}>
                            <Header info={this.props.info}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <Switch>
                                <Route exact path='/' component={PostListContainer}/>
                                <Route path='/posts/:slug' component={PostPage}/>
                            </Switch>
                        </Col>
                    </Row>
                </div>
            </Router>
            )
    }
}