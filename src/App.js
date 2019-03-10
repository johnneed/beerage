// @flow
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/';
import Home from './screens/home';
import Initialize from './components/initialize';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

const store = createStore(reducer, applyMiddleware(thunk));

const App = (): React.Component => (
    <Provider store={store}>
        <Initialize>
            <BrowserRouter>
                <Switch>
                    <Route component={Home}
                           path='/beers/:bid?'/>
                    <Redirect to={'/beers'}/>
                </Switch>
            </BrowserRouter>
        </Initialize>
    </Provider>
);


export default App;
