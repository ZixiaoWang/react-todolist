import { createStore, combineReducers } from 'redux';
import { memosReducers, timeReducers } from './reducer';

const reducer = combineReducers({
    memosReducers: memosReducers,
    timeReducers: timeReducers
});
export const store = createStore(reducer);