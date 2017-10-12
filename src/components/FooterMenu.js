import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FooterMenu extends React.PureComponent {
    render() {
        return (
            <div className='footer_menu'>
                <ul>
                    <li><Link to='/about-myself'>ABOUT</Link></li>
                    <li><Link to='/guestbook'>留言板</Link></li>
                </ul>
            </div>
        )
    }
}