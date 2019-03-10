// @flow
import React from 'react';
import './styles.css';
import cap from './cap.png';


type Props = { message: string };

const Spinner = ({message}: Props): React.Component => (
    <div className='spinner'>
        <div className='spinner--centered'>
            <img
                alt='bottle cap spinner'
                className='spinner--bottle-cap'
                src={cap}
            />
            <p className={'spinner--message'}>{message}</p>
        </div>
    </div>
);


export default Spinner;