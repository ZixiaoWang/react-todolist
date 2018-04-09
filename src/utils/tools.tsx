import { Memo, MemoList } from "./interface";

export function getMemoByYear(): MemoList {
    return [];
}

export function sortByStartTime(pre: Memo, next: Memo): number{
    return next.startTime - pre.startTime;
}

export function findMemosBetween(memo: Memo, from: number, to: number): Memo | undefined {
    if(memo.startTime >= from && memo.endTime <= to) {
        return memo;
    }
    return undefined;
}

export function classifyIntoDays(memolist: MemoList): Map<number, MemoList> {
    let map = new Map<number, MemoList>();

    memolist.forEach((memo: Memo) => {
        let day = whichdays(memo.startTime);

        if(map.has(day) === false) {
            map.set(day, []);
        }

        let memoInOneDay = map.get(day) as MemoList;
        memoInOneDay.push(memo);
    });

    return map;
}

export function whichdays(timestamp: number): number {
    let date = new Date(timestamp).getTime();
    let day = date - date % MILLIONSECOND_PER_DAY;
    return day;
}

export function guid() {
    function s4() {
        return Math.floor((Math.random()) * 0x10000)
        .toString(16)
        .split('.')[0];
    }
    return [s4(), s4(), s4(), s4(), s4(), s4()].join('');
}

export function timestampToTime(timestamp: number): string {
    let date = new Date(timestamp);
    return date.toTimeString().substring(0,5);
}

export function timestampToDate(timestamp: number): string {
    let date = new Date(timestamp);
    return date.toJSON().substring(0, 10);
}

export const MILLIONSECOND_PER_DAY: number = 8640000;