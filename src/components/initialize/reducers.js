import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.initialize, action) {
    switch (action.type) {
        case types.FETCH_BEER_LIST_SUCCESS:
            return {
                ...state,
                beerList: action.data
            };
        case types.FETCH_BEER_LIST_FAIL:
            return {
                ...state,
                beerList: []
            };

        default:
            return state;
    }
}