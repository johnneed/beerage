import * as types from '../../constants/action-types';
import initialState from '../../reducers/initial-state';

export function reducers(state = initialState.home, action) {
    switch (action.type) {
        case types.FETCH_BEER_SUCCESS:
            return (action.data || []).length > 0
                ? {
                    ...state,
                    beerDetails: {...state.beerDetails, [action.data[0].bid]: action.data[0]}
                }
                : state;
        case types.FETCH_BEER_FAIL:
            return {
                ...state,
                beers: []
            };

        default:
            return state;
    }
}