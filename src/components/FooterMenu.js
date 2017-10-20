import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './FooterMenu.css';

class FooterMenu extends PureComponent {
    render() {
        return (
            <ul className='footer_menu'>
                <li><Link to='/about-myself'>ABOUT</Link></li>
                <li><Link to='/guestbook'>留言板</Link></li>
                <li><Link to='/archive'>Archive</Link></li>
            </ul>
        )
    }
}

export default FooterMenu;