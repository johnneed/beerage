// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './styles.css';
import {curry} from 'ramda';
import Search from '../search';
import queryString from 'query-string';
import {IO} from 'monet';


const search = Symbol('@@_SEARCH');
const changeState = Symbol('@@_CHANGE-STATE');

/**
 *
 * @param {string} term - query term
 * @returns {*} IO Monad
 * @private
 */
function _search(term: string) {
    return () => {
        const q = queryString.parse(window.location.search);
        const next = `${this.props.location.pathname}?${ queryString.stringify({...q, search: term})}`;
        return IO(() => this.props.history.push(next)).run();
    };
}

/**
 *
 * @param {string} key - key to set
 * @param {any} val - value to set
 * @returns {void}
 * @private
 */
function _changeState(key: string, val: string) {
    clearTimeout(this.timerId);
    const update = () => {
        this.timerId = setTimeout(this[search](val), 500);
    };
    this.setState({[key]: val}, update);
}


type Props = {
    searchString: string,
    onSearch: string => void
};


class _SearchBar extends Component<Props> {

    constructor(props) {
        super(props);
        (this: any)[changeState] = curry(_changeState.bind(this));
        (this: any)[search] = _search.bind(this);
        this.state = {searchString: props.searchString || ''};
    }

    componentDidMount() {
        const q = queryString.parse(window.location.search);
        this.setState({searchString: q.search});
    }


    render() {
        return (
            <section className={'search-bar'}>
                <Search
                    isError={false}
                    onChange={this[changeState]('searchString')}
                    onSearch={this[search](this.state.searchString)}
                    rule={() => true}
                    value={this.state.searchString}
                />
            </section>
        );
    }
}


export default withRouter(_SearchBar);