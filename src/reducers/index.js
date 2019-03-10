import {combineReducers} from 'redux';

/** Add Reducers here **/
import {reducers as home} from '../screens/home/reducers';
import {reducers as initialize} from '../components/initialize/reducers';

const rootReducer = combineReducers({home, initialize});

export default rootReducer;