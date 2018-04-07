import * as React from 'react';
import { Component } from 'react';
import { Memo, MemoList } from '../utils/interface';
import { GET_ALL_MEMOS } from '../redux/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { classifyIntoDays } from '../utils/tools';

export interface ListItemProps {
    events: MemoList
}

export class ListItem extends Component {

    constructor(public props: ListItemProps) {
        super(props);
    }

    renderMemos(): JSX.Element[]{
        let memoMap = this.props.events;
        return this.props.events.map((memo: Memo, index: number) => {
            let eventClass = "event " + memo.color;
            let time = new Date(memo.startTime);
            let starttime: string = time.toTimeString().substring(0, 5);

            return (
                <div className={ eventClass } key={ index }>
                    <div className="event-time">
                        <div className="txt-md">{ starttime }</div>
                    </div>
                    <div className="event-detail">
                        <div className="txt-md">{ memo.title }</div>
                        <div className="txt sm grey-4">{ memo.notes }</div>
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

class List extends Component {

    private month: string = '--';
    private year: string = '--';

    constructor(public props: any) {
        super(props);
    }

    renderList(): JSX.Element {
        let memoList = this.props.events || new Map();
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
        this.props.getAllMemos();
    }

    render() {
        return (
            <div className="list-container">
                <div className="list-header">
                    <span>
                        { this.month } &nbsp; { this.year }
                    </span>
                </div>
                { this.renderList() }
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        events: classifyIntoDays(state)
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        getAllMemos: () => {
            return dispatch({ type: GET_ALL_MEMOS });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)