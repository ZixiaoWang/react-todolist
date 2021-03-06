export interface ActionBase { type: string };

export interface Memo {
    guid: string,
    title: string,
    startTime: number,
    endTime: number,
    location?: string,
    color: string,
    url?: string,
    notes?: string,
    [key: string]: string | undefined | number
}

export type MemoList = Array<Memo>