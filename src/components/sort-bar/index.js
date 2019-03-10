// @flow
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './styles.css';
import {curry} from 'ramda';
import Sort from '../sort';
import queryString from 'query-string';
import {IO} from 'monet';


const sort = Symbol('@@_SORT');
const changeState = Symbol('@@_CHANGE-STATE');

/**
 *
 * @param {string} sortField - sort field
 *  * @param {string} direction - sort direction

 * @returns {*} IO Monad
 * @private
 */
function _sort(sortField: string, direction: string) {
    const q = queryString.parse(window.location.search);
    const next = `${this.props.location.pathname}?${ queryString.stringify({
        ...q,
        sortField: sortField,
        direction: direction
    })}`;
    return IO(() => this.props.history.push(next)).run();
}

/**
 *
 * @param {string} key - key to set
 * @param {any} val - value to set
 * @returns {void}
 * @private
 */
function _changeState(key: string, val: string) {
    const update = () => {
        this[sort](this.state.sortField, this.state.direction);
    };
    this.setState({[key]: val}, update);
}


type Props = {
    sortField: string,
    direction: string,
    match: Object
};


class SortBar extends Component<Props> {

    constructor(props) {
        super(props);
        (this: any)[changeState] = curry(_changeState.bind(this));
        (this: any)[sort] = _sort.bind(this);
    }

    render() {
        const q = queryString.parse(window.location.search);
        return (
            <section className={'sort-bar'}>
                <Sort
                    direction={q.direction || 'asc'}
                    onChange={this[sort]}
                    sortField={q.sortField || 'brewery'}
                />
            </section>
        );
    }
}


export default withRouter(SortBar);