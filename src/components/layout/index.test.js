/* global it, test, describe, jest, beforeEach, afterEach, expect, spyOn */

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './index';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

describe('Layout', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Layout/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(<Layout/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('renders the dealer name', () => {
        const wrapper = mount(<Layout name={'foo motors'}/>);
        expect(wrapper.find('.layout--header-dealer-name').text()).toEqual('foo motors');
    });

    it('renders the dealer logo', () => {
        const wrapper = mount(<Layout logo={'foomotors.jpg'}/>);
        const logoSpan = wrapper.find('.layout--header-logo-span');
        expect(logoSpan.props().style.backgroundImage).toEqual('url("foomotors.jpg")');
    });

    it('renders children', () => {
        const wrapper = mount(<Layout name={'foo motors'}>
            <div id={'kids'}>{'kids'}</div>
        </Layout>);
        expect(wrapper.find('#kids').text()).toEqual('kids');
    });
});