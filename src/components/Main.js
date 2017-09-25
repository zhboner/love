import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import './Main.css';
import Header from './Header';
import Footer from './Footer';
import PostListContainer from './PostListContainer';
import PostPage from './PostPage';

import { fetchCategories } from '../actions/fetchCategories'


class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.getCategories();
    }



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
                    <Row className='footer'>
                        <Col span={12} offset={6}>
                            <Footer/>
                        </Col>
                    </Row>
                </div>
            </Router>
            )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getCategories: () => {
            dispatch(fetchCategories())
        }
    };
};

export default connect(null, mapDispatchToProps)(Main);