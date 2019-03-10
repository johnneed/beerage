// @flow
import React, {Fragment} from 'react';
import './styles.css';
import '@mdi/font/css/materialdesignicons.css';


type Props = {
    children: ?any,
    footer: ?Object,
    header: ?Object
};


const Layout = ({children, footer, header}: Props) =>
    (
        <Fragment>
            <header className={'layout--header'}>{header}</header>
            <main className='layout--main'>
                {children}
            </main>
            <footer className={'layout--footer'}>
                {footer}
            </footer>
        </Fragment>
    );


export default Layout;