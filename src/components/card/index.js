// @flow
import React from 'react';
import './styles.css';

const Card = ({children, className}: { children: any, className?: string }): any => (
    <div className={`card${className ? ` ${className}` : ''}`}>
        {children}
    </div>
);

export default Card;