// @flow
import * as data from '../../data';
import {FETCH_BEER_LIST_FAIL, FETCH_BEER_LIST_SUCCESS} from '../../constants/action-types';

export const fetchBeerList = () => (dispatch: any => any): void => {
    data.fetchBeerList().then(response => {
        dispatch({
            type: FETCH_BEER_LIST_SUCCESS,
            data: response
        });

    }).catch(error => {
        dispatch({
            type: FETCH_BEER_LIST_FAIL,
            error: error
        });
    });
};
