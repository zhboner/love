import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

import './PrimaryMenu.css'

class PrimaryMenu extends Component {
    render() {
        const { Item } = Menu;
        return (
            <Menu
                className='primary_menu'
                mode="horizontal"
                selectedKeys={[null]}
            >

                    <Item key="dairy"><Link to='/posts/category/dairy'>日志</Link></Item>
                    <Item key="notes"><Link to='/posts/category/notes'>随笔</Link></Item>
                    <Item key="booknote"><Link to='/posts/category/booknote'>书摘</Link></Item>
                    <Item key="economist"><Link to='/posts/category/economist'>经济学人</Link></Item>

            </Menu>
        )
    }
}

export default withRouter(PrimaryMenu);