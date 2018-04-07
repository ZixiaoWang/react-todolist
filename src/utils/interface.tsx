export interface ActionBase { type: string };

export interface Memo {
    id: number,
    guid: string,
    title: string,
    startTime: number,
    endTime: number,
    location?: string,
    color: string,
    url?: string,
    notes?: string
}

export type MemoList = Array<Memo>