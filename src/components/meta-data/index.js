// @flow
import React, {Component} from 'react';
import './styles.css';
import moment from 'moment/moment';

export const MetaData = ({id, created, updated}: { id: string, created: Date, updated: Date }): Component => (
    <div className={'meta-data'}>
        <div className={'meta-data--wrapper'}>
            <div>
                <span className={'meta-data--label'}>{'Id'}</span>
                <span className={'meta-data--value-breakable'}>{id}</span>
            </div>
            <div>
                <span className={'meta-data--label'}>{'Created'}</span>
                <span className={'meta-data--value'}>{moment(created).format('YYYY-MM-DD h:mm A')}</span>
            </div>
            <div>
                <span className={'meta-data--label'}>{'Updated'}</span>
                <span className={'meta-data--value'}>{moment(updated).format('YYYY-MM-DD h:mm A')}</span>
            </div>
        </div>
    </div>
);
