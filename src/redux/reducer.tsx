import { Reducer } from 'redux';
import { GET_EVENTS } from './actions';
import { EVENTS } from '../data/events';
import { Action, Memo, MemoList } from './interface';

export function eventsReducers(state: MemoList = [], action: Action): MemoList{

    switch(action.type) {
        case GET_EVENTS:
            return EVENTS.sort(byStartTime);
        
        default:
            return state;
    }
}

function byStartTime(pre: Memo, next: Memo): number{
    return next.startTime - pre.startTime;
}