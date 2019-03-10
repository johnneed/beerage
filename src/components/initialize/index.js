// @flow
import React, {useEffect, Fragment} from 'react';
import Spinner from '../spinner';
import * as initializeActions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

type Props = { children: any, beerList: Array<Object>, actions: Object };

const Initialize = ({children, beerList, actions}: Props): React.Component => {
    const initialized = (beerList || []).length > 0;
    useEffect(
        () => {
            if (!initialized) {
                actions.fetchBeerList();
            }
        }, []
    );
    return (
        <Fragment>
            {initialized ? children : <Spinner message={'Loading All the Beers'}/>}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({beerList: state.initialize.beerList});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(initializeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Initialize);