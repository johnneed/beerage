/* global it, test, describe, jest, beforeEach, afterEach, expect, spyOn */

jest.mock('../with-validation');
import React from 'react';
import ReactDOM from 'react-dom';
import URL from './index';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('URL', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <URL/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    it('renders correctly', () => {
        const tree = renderer
            .create(
                <URL
                    disabled={true}
                    id={'foo'}
                    isError={true}
                    onChange={() => true}
                    readOnly={true}
                    required={true}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });


    test('URL renders labels correctly', () => {
        const wrapper = mount(<URL labelText={'foo'}/>);
        expect(wrapper.find('.url--label-text').text()).toEqual('foo');
    });

    test('URL renders an error correctly', () => {
        const wrapper = mount(<URL errorMessage='foo' isError={true}/>);
        expect(wrapper.find('label').hasClass('is-error')).toEqual(true);
        expect(wrapper.find('.url--error-message').text()).toEqual('foo');
    });

    test('URL renders a disabled control correctly', () => {
        const wrapper = mount(<URL disabled={true}/>);
        expect(wrapper.find('label').hasClass('is-disabled')).toEqual(true);
        expect(wrapper.find('input').prop('disabled')).toBe(true);
    });

    test('URL renders a required control correctly', () => {
        const wrapper = mount(<URL required={true}/>);
        expect(wrapper.find('label').hasClass('is-required')).toEqual(true);
        expect(wrapper.find('input').prop('required')).toBe(true);
    });

    test('URL renders a read-only control correctly', () => {

        const wrapper = mount(<URL readOnly={true}/>);
        expect(wrapper.find('label').hasClass('is-read-only')).toEqual(true);
        expect(wrapper.find('input').prop('readOnly')).toBe(true);
    });

});
