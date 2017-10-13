import React, {PureComponent} from 'react';

import FooterMenu from './FooterMenu';
import './Footer.css'

export default class Footer extends PureComponent {
    render() {
        return (
            <div className='foot'>
                <div>
                    <FooterMenu/>
                </div>
                <div>
                    <p>自豪地使用Wordpress</p>
                    <p>由zhboner设计</p>
                </div>
            </div>
        )
    }
}