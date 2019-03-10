/* global it, test, describe, jest, beforeEach, afterEach, expect, spyOn */

jest.mock('../with-validation');
import React from 'react';
import ReactDOM from 'react-dom';
import TextBox from './index';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

describe('TextBox', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <TextBox/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    it('renders correctly', () => {
        const tree = renderer
            .create(
                <TextBox
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

    test('TextBox renders labels correctly', () => {
        const wrapper = mount(
            <TextBox labelText={'foo'}/>
        );
        expect(wrapper.find('.text-box--label-text').text()).toEqual('foo');
    });

    test('TextBox renders an error correctly', () => {
        const wrapper = mount(<TextBox errorMessage='foo' isError={true}/>);
        expect(wrapper.find('label').hasClass('is-error')).toEqual(true);
        expect(wrapper.find('.text-box--error-message').text()).toEqual('foo');
    });

    test('TextBox renders a disabled control correctly', () => {
        const wrapper = mount(<TextBox disabled={true}/>);
        expect(wrapper.find('label').hasClass('is-disabled')).toEqual(true);
        expect(wrapper.find('input').prop('disabled')).toBe(true);
    });

    test('TextBox renders a required control correctly', () => {
        const wrapper = mount(<TextBox required={true}/>);
        expect(wrapper.find('label').hasClass('is-required')).toEqual(true);
        expect(wrapper.find('input').prop('required')).toBe(true);
    });

    test('TextBox renders a read-only control correctly', () => {
        const wrapper = mount(<TextBox readOnly={true}/>);
        expect(wrapper.find('label').hasClass('is-read-only')).toEqual(true);
        expect(wrapper.find('input').prop('readOnly')).toBe(true);
    });

});