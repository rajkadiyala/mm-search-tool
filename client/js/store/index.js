import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import user from './reducers/user';
import neighbors from './reducers/neighbors';

const reducer = combineReducers({user, neighbors});
const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({collapsed: true}));
}

export default createStore(reducer, applyMiddleware(...middleware));

export * from './actions/user';
export * from './actions/neighbors';
