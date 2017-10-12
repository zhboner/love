import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './PrimaryMenu.css'

class PrimaryMenu extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        console.log(e);
    };


    render() {
        return (
            <div className='primary_menu'>
                <ul>
                    <li><Link to='/posts/category/dairy'>日志</Link></li>
                    <li><Link to='/posts/category/notes'>随笔</Link></li>
                    <li><Link to='/posts/category/booknote'>书摘</Link></li>
                    <li><Link to='/posts/category/economist'>经济学人</Link></li>
                </ul>
            </div>
        )
    }
}

export default PrimaryMenu;