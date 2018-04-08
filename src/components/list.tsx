import * as React from 'react';
import { Component } from 'react';
import { Memo, MemoList } from '../utils/interface';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { classifyIntoDays } from '../utils/tools';
import { Link } from 'react-router-dom';
import { db } from '../data/db';
import { history } from '../data/history';

export interface ListItemProps {
    events: MemoList
}

export class ListItem extends Component {

    constructor(public props: ListItemProps) {
        super(props);
    }

    cutString(notes: string | undefined, length?: number): string{
        let maxLength = length || 110;
        let output = [];

        if(typeof notes === 'string') {
            let words = notes.split(' ');
            for(let i=0; i<words.length; i++){
                let word = words[i];
                if(maxLength - (word.length + 1) >= 0) {
                    output.push(word);
                    maxLength -= word.length + 1;
                    continue;
                } else {
                    break;
                }
            }
        }

        return output.join(' ') + '...';
    }

    gotoDetail(guid: string) {
        history.push('/edit/' + guid)
    }

    renderMemos(): JSX.Element[]{
        let memoMap = this.props.events;
        return this.props.events.map((memo: Memo, index: number) => {
            let eventClass = "event " + memo.color;
            let time = new Date(memo.startTime);
            let starttime: string = time.toTimeString().substring(0, 5);
            let year: number = time.getFullYear();
            let date: string = time.toDateString().substring(4, 10);

            return (
                <div className={ eventClass } key={ index } onClick={ this.gotoDetail.bind(this, memo.guid) }>
                    <div className="event-time">
                        <div className="txt-ti grey-3">{ year }</div>
                        <div className="txt-ti grey-3">{ date }</div>
                        <div className="txt-md">{ starttime }</div>
                    </div>
                    <div className="event-detail">
                        <div className="txt-md">{ this.cutString(memo.title, 38) }</div>
                        <div className="txt sm grey-4">
                            { this.cutString(memo.notes) }
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="list-item">
                { this.renderMemos() }
            </div>
        )
    }
}

export default class List extends Component {

    private month: string = '--';
    private year: string = '--';
    public state: any = { memoList: new Map() }

    constructor(public props: any) {
        super(props);
    }

    renderList(): JSX.Element {
        let memoList = this.state.memoList || new Map();
        let memoViewList: JSX.Element[] = [];
        memoList.forEach((events: MemoList, day: number) => {
            memoViewList.push( <ListItem events={ events } key={ day } /> );
        });
        
        return (
            <div className="list-body">
                { memoViewList }
            </div>
        )
    }

    componentDidMount() {
        let memoList = classifyIntoDays(db.selectAll());
        this.setState({ memoList: memoList });
    }

    render() {
        return (
            <div className="list-container">
                {/* 
                    <div className="list-header">
                        <span>
                            { this.month } &nbsp; { this.year }
                        </span>
                    </div> 
                */}
                { this.renderList() }
            </div>
        )
    }
}