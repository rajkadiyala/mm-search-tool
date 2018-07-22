import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './reducers/user';

const reducer = combineReducers({user});
const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({collapsed: true}));
}

export default createStore(reducer, applyMiddleware(...middleware));

export * from './actions/user';
