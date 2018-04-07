import { Reducer } from 'redux';
import { GET_ALL_MEMOS, FILTER_MEMOS } from './actions';
import { MEMOS } from '../data/events';
import { Memo, MemoList } from '../utils/interface';
import { sortByStartTime, findMemosBetween } from '../utils/tools';

export function eventsReducers(state: MemoList = [], action: any): MemoList{

    switch(action.type) {
        
        // 返回所有memo
        case GET_ALL_MEMOS:
            return MEMOS.sort(sortByStartTime);
        
        // 过滤memo，返回发生在from和to区间的memolist
        case FILTER_MEMOS:
            let from = action.from;
            let to = action.to;
            let memos =  MEMOS.filter((memo: Memo) => {
                            let m = findMemosBetween(memo, from, to);
                            if(m !== undefined) {
                                return m;
                            }
                        }).sort(sortByStartTime);
            return memos;

        default:
            return state;
    }

}