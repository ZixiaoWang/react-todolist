import * as React from 'react';
import { Component } from 'react';
import { FILTER_MEMOS } from '../redux/actions';
import { connect } from 'react-redux';
import { MemoList, Memo } from '../utils/interface';
import { db } from '../data/db';

interface CellProps {
    date: number;
    inactive: boolean;
    events: Array<{ type: string }>
}

class Cell extends Component {

    constructor(public props: any) {
        super(props);
    }

    getCellClass(): string {
        let className = 'cell';
        if(this.props.inactive) {
            className += ' inactive';
        }
        return className;
    }

    renderEventList(): JSX.Element {
        return (
            this.props.events.map((event: Memo, index: number) => {
                let memoColor = 'cell-event ' + event.color;
                return <div key={ index } className={ memoColor }></div>
            })
        );
    }

    render() {
        return (
            <div className={ this.getCellClass() }>
                <div className="txt-md">{ this.props.date }</div>
                { this.renderEventList() }
            </div>
        )
    }

}

class Month extends Component {

    public state: any;
    private months: any = {
        "0": 'Jan', "1": 'Feb',
        "2": 'Mar', "3": 'Apr',
        "4": 'May', "5": 'Jun',
        "6": 'Jul', "7": 'Aug',
        "8": 'Sep', "9": 'Oct',
        "10": 'Nov',"11": 'Dec'
    }
    private weekdays: string[] = [
        'Sun', 'Mon', 'Tue', 'Wed', 
        'Thu', 'Fri', 'Sat'
    ];
    private startDate: Date;
    private year: number;
    private month: number;
    private startTime: number;

    constructor(public props: any) {
        super(props);

        let date = new Date();
        this.year = this.props.year || date.getFullYear();
        this.month = this.props.month || date.getMonth();
        this.startDate = new Date(this.year, this.month);
        this.startTime = this.startDate.getTime();
    }

    componentDidMount() {
        let from = new Date(this.year, 0).getTime();
        let to = new Date(this.year, 11).getTime();
        this.props.filterMemo(from, to);
    }

    renderHeader(): JSX.Element {
        
        let weekdays = this.weekdays.map((day: string, index: number) => {
            return <div key={ index } className="cell">{ day }</div>
        });

        let month = this.months[this.month];

        return (
            <div className="grid-head">
                <div className="cell full-col month-header">
                    <div>
                        <span className="txt-lg">{ month }</span>
                        <span>&nbsp;</span>
                        <span className="txt-sm grey-4">{ this.year }</span>
                    </div>
                </div>
                { weekdays }
            </div>
        )
    }

    renderCalendar(): JSX.Element{

        let cells = [];
        let memos = this.props.memos || [];
        let totalDays = (new Date(this.year, this.month+1).getTime() - this.startTime) / ( 1000 * 60 * 60 * 24 );

        for(let i=0; i<35; i++) {
            let day = '';
            let events: MemoList = [];

            if( i >= this.startDate.getDay() && i <= totalDays) {
                day = (i + 1).toString();
            }

            events = db.findBetween(
                new Date(this.year, this.month, i).getTime(), 
                new Date(this.year, this.month, i+1).getTime()
            );

            cells.push(
                <Cell key={i} date={ day } inactive={false} events={ events }></Cell>
            )
        }

        return (
            <div className="grid-body">
                { cells }
            </div>
        )
    }

    render() {
        return (
            <div className="grid-container">
                { this.renderHeader() }
                { this.renderCalendar() }
            </div>
        )
    }

}

function mapStateToProps(state: MemoList, props: any) {
    return {
        memos: state
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        filterMemo: function(from: number ,to: number){
            dispatch({
                type: FILTER_MEMOS,
                from: from,
                to: to
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Month);