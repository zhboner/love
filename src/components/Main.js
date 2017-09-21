import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import './Main.css';
import Header from './Header';
import Footer from './Footer';
import PostListContainer from './PostListContainer';
import PostPage from './PostPage';

import { getCategoriesList } from '../services/categories';
import { saveCategories } from '../actions'


class Main extends Component {
    constructor(props){
        super(props);

        this.loadCategories = this.loadCategories.bind(this);
    }

    componentWillMount() {
        this.loadCategories();
    }

    loadCategories() {
        getCategoriesList().then((response)=>{
            let dict = {};
            response.data.map((cat) => {
                dict[cat.id] = cat.name;
            });

            this.props.persistCategories(dict);
        })
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
        persistCategories: (categories) => {
            dispatch(saveCategories(categories))
        }
    };
};

export default connect(null, mapDispatchToProps)(Main);