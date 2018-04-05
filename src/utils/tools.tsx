import { Memo, MemoList } from "./interface";

export function getMemoByYear(): MemoList {
    return [];
}

export function sortByStartTime(pre: Memo, next: Memo): number{
    return next.startTime - pre.startTime;
}

export function filterByMonth(memo: Memo, from: number, to: number): Memo | undefined {
    if(memo.startTime >= from && memo.endTime <= to) {
        return memo;
    }
    return undefined;
}