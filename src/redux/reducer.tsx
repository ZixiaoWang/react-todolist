import { Reducer } from 'redux';
import { GET_ALL_MEMOS, FILTER_MEMOS } from './actions';
import { MEMOS } from '../data/events';
import { Memo, MemoList } from './interface';

export function eventsReducers(state: MemoList = [], action: any): MemoList{

    switch(action.type) {
        case GET_ALL_MEMOS:
            return MEMOS.sort(sortByStartTime);
        
        case FILTER_MEMOS:
            let from = action.from;
            let to = action.to;
            let memos =  MEMOS.filter((memo: Memo) => {
                            let m = filterByMonth(memo, from, to);
                            if(m !== undefined) {
                                return m;
                            }
                        }).sort(sortByStartTime);
            return memos;

        default:
            return state;
    }
}

function sortByStartTime(pre: Memo, next: Memo): number{
    return next.startTime - pre.startTime;
}

function filterByMonth(memo: Memo, from: number, to: number): Memo | undefined {
    if(memo.startTime >= from && memo.endTime <= to) {
        return memo;
    }
    return undefined;
}