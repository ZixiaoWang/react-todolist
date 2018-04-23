import { MEMOS } from './events';
import { Memo, MemoList } from '../utils/interface';
import { guid, filterByKeyWord } from '../utils/tools';

class DB {

    private map: Map<string, Memo> = new Map();
    private memolist: MemoList = MEMOS;

    constructor() {
        this.memolist.forEach((memo: Memo, index: number) => {
            this.map.set(memo.guid, memo);
        });
    }

    has(guid: string): boolean {
        return this.map.has(guid);
    }

    findBetween(from: number, to: number): MemoList{
        let list: MemoList = [];

        this.memolist.forEach((memo) => {
            if(memo.startTime >= from && memo.startTime <= to) {
                list.push(memo);
            }
        });

        return list;
    }

    search(keyword: string): MemoList {
        return this.memolist.filter((memo: Memo, index: number) => {
            return filterByKeyWord(memo, keyword);
        })
    }

    selectAll(): MemoList {
        return this.memolist;
    }

    query(guid: string): Memo | undefined {
        return this.map.get(guid);
    }

    insert(memo: Memo): string{
        let m = Object.assign(memo, { guid: guid() });
        this.memolist.push(m);
        this.map.set(m.guid, m);
        return m.guid;
    }

    update(memo: Memo, guid: string): string | boolean{
        if(this.map.has(guid) === false) {
            return false;
        }

        this.map.set(guid, memo);

        this.memolist = [];
        this.map.forEach((memo: Memo) => {
            this.memolist.push(memo);
        });

        return guid;
    }

    remove(guid: string): boolean {
        if(this.map.has(guid) === false) {
            return true;
        }

        this.map.delete(guid);
        this.map.forEach((memo: Memo) => {
            this.memolist.push(memo);
        });

        return true;
    }
}

export const db = new DB();