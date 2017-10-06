import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Main.css';
import Header from './Header';
import Footer from './Footer';
import PostListContainer from './PostListContainer';
import CategoryPosts from './CategoryPosts';
import PostPage from './PostPage';
import PagePage from './PagePage';

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
                        <Col md={{span: 12, offset: 6}} sm={{span: 18, offset: 3}} xs={{span: 20, offset: 2}}>
                            <Header info={this.props.info}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 12, offset: 6}} sm={{span: 18, offset: 3}} xs={{span: 20, offset: 2}}>
                            <Switch>
                                <Route exact path='/' component={PostListContainer}/>
                                <Route path='/posts/category/:slug' component={CategoryPosts}/>
                                <Route path='/posts/:slug' component={PostPage}/>
                                <Route path='/:slug' component={PagePage}/>
                            </Switch>
                        </Col>
                    </Row>
                    <Row className='footer'>
                        <Col md={{span: 12, offset: 6}} sm={{span: 18, offset: 3}} xs={{span: 20, offset: 2}}>
                            <Footer/>
                        </Col>
                    </Row>
                </div>
            </Router>
            )
    }

    static propTypes = {
        info: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
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