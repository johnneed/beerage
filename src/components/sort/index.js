// @flow
import React from 'react';
import './styles.css';
import {curry} from 'ramda';

type Props = {
    direction: string,
    onChange: any => void,
    sortField: string,
};


const Sort = ({direction, onChange, sortField}: Props): React.Component => {

    const sortStuff = curry((field, event): void => {
        switch (field) {
            case 'direction' :
                onChange(sortField, event.target.checked ? 'desc' : 'asc');
                break;
            case 'sortField':
                onChange(event.target.checked ? 'beer' : 'brewery', direction);
                break;

            default :
                onChange('brewery', 'asc');
        }
    });

    return (
        <div className={'sort'}>
            <span className={'sort--text'}>{'Sort'}</span>
            <span>
                <span>{'Brewery'}</span>
                <label className={'sort--switch'}>
                    <input onChange={sortStuff('sortField')} type={'checkbox'}/>
                    <span className='sort--slider'/>
                </label>
                <span>{'Beer'}</span>
            </span>
            <span>
                <span>{'Asc'}</span>
                <label className='sort--switch'>
                    <input onChange={sortStuff('direction')} type='checkbox'/>
                    <span className='sort--slider'/>
               </label>
                <span>{'Desc'}</span>
            </span>
        </div>
    );
};

export default Sort;