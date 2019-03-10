// @flow
import React, {Component} from 'react';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import uuid from 'uuid';

const type = 'search';
const excludedProps = ['children', 'className', 'onSearch', 'errorMessage', 'isError', 'labelText'];
const filterProps = _props => ({
    ...Object.keys(_props)
        .filter(key => excludedProps.indexOf(key) === -1)
        .reduce((obj, key) => ({...obj, [key]: _props[key]}), {}),
    type,
    id: _props.id || uuid(),
    placeholder: _props.placeholder || 'Search'
});


type Props = {
    disabled: boolean,
    errorMessage: string,
    isError: boolean,
    labelText: string,
    onSearch: string => any,
    readOnly: boolean,
    required: boolean,
    style: Object,
    value: string
};

class Search extends Component<Props> {


    static defaultProps = {
        disabled: false,
        isError: false,
        required: false,
        errorMessage: 'Error',
        readOnly: false,
        value: ''
    };


    render() {
        const {onSearch} = this.props;
        const componentClass = 'search';
        const inputProps = filterProps(this.props);
        const _onChange = (event) => inputProps.onChange(event.target.value);
        return (
            <label
                className={componentClass}
                htmlFor={inputProps.id}
            >
                <input {...inputProps} onChange={_onChange}/>
                <FontAwesomeIcon icon={faSearch} onClick={onSearch}/>
            </label>
        );
    }
}


export default Search;