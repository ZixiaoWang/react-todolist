import { createStore } from 'redux';
import { eventsReducers } from './reducer';

export const store = createStore(eventsReducers);