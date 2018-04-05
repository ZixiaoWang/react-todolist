export interface ActionBase { type: string };

export interface Memo {
    id: number,
    guid: string,
    title: string,
    startTime: number,
    endTime: number,
    location?: string,
    url?: string,
    notes?: string
}

export type MemoList = Array<Memo>