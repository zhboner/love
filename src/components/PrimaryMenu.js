import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './PrimaryMenu.css'

class PrimaryMenu extends Component {
    constructor(props) {
        super(props);
        this.extractMenu = this.extractMenu.bind(this);
    }

    extractMenu(instance) {

        // TODO: This should be tested under wordpress.
        const re_tag = /<li.*>(.*)<\/li>/;
        const tags = instance.match(re_tag);
    }

    render() {
        // if (!window.RT_API || !window.RT_API.menu) {
        //     return (<div></div>);
        // }
        // this.extractMenu(window.RT_API.menu);

        return (
            <div className='primary_menu'>
                <ul>
                    <li><Link to='/about-myself'>ABOUT</Link></li>
                    <li><Link to='/guestbook'>留言板</Link></li>
                </ul>
            </div>
        )
    }
}

export default PrimaryMenu;