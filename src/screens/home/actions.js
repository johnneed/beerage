import {FETCH_BEER_SUCCESS, FETCH_BEER_FAIL} from '../../constants/action-types';
import * as data from '../../data';


// Use a thunk ( a function returned from a function) to get async behavior
export function fetchBeer(bid) {
    return (dispatch) => {
        if (bid) {
            data.fetchBeer(bid).then(response => {
                dispatch({
                    type: FETCH_BEER_SUCCESS,
                    data: response
                });

            }).catch(error => {
                dispatch({
                    type: FETCH_BEER_FAIL,
                    error: error
                })
            });
        }
    };
}