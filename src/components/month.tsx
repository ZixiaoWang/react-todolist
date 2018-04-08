import * as React from 'react';
import { Component } from 'react';
import { FILTER_MEMOS, CHANGE_MONTH } from '../redux/actions';
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
        if(this.props.status === false) {
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



interface MonthStateEx {
    year: number,
    month: number,
    startTime: number,
    startDate: Date
}
class Month extends Component {

    public state: any = { memos: [] }

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
    private startDate: Date = new Date();
    private year: number = this.startDate.getFullYear();
    private month: number = this.startDate.getMonth();
    private startTime: number = this.startDate.getTime()

    constructor(public props: any) {
        super(props);
        this.setDate(this.props);
        this.updateMemoList();
    }

    componentWillUpdate(nextProps: any, nextState: any) {
        this.setDate(nextProps);
        this.updateMemoList();
    }

    componentDidMount() {
        this.updateMemoList();
    }

    lastMonth() { 
        let targetMonth = this.month - 1;
        this.props.toMonth(targetMonth); 
    }
    nextMonth() { this.props.toMonth(this.month + 1); }

    renderHeader(): JSX.Element {
        
        let weekdays = this.weekdays.map((day: string, index: number) => {
            return <div key={ index } className="cell">{ day }</div>
        });

        let month = this.months[this.month];

        return (
            <div className="grid-head">
                <div className="grid-head-month">
                    <div className="cell month-header" onClick={ this.lastMonth.bind(this) }>
                        <i className="material-icons txt-lg grey-4">keyboard_arrow_left</i>
                    </div>
                    <div className="cell full-col month-header">
                        <div>
                            <span className="txt-lg">{ month }</span>
                            <span>&nbsp;</span>
                            <span className="txt-sm grey-4">{ this.year }</span>
                        </div>
                    </div>
                    <div className="cell month-header" onClick={ this.nextMonth.bind(this) }>
                        <i className="material-icons txt-lg grey-4">keyboard_arrow_right</i>
                    </div>
                </div>
                <div className="grid-head-weeks">
                    { weekdays }
                </div>
            </div>
        )
    }

    renderCalendar(): JSX.Element{

        let cells = [];
        let memos = this.state.memos || [];
        let totalDays = (new Date(this.year, this.month+1).getTime() - this.startTime) / ( 1000 * 60 * 60 * 24 );
        let startDay = this.startDate.getDay();

        for(let i=0; i<42; i++) {
            let day = '';
            let events: MemoList = [];
            let active: boolean = false;

            if( i >= startDay && i < totalDays + startDay) {
                day = (i - startDay + 1).toString();
                active = true;
                events = db.findBetween(
                    new Date(this.year, this.month, i).getTime(), 
                    new Date(this.year, this.month, i+1).getTime()
                );
            }

            cells.push(
                <Cell key={i} date={ day } status={ active } events={ events }></Cell>
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

    private setDate(props: any) {
        let year = props.year === undefined ?  this.year : props.year;
        let month = props.month === undefined ? this.month : props.month;
        this.startDate = new Date(year, month);
        this.year = this.startDate.getFullYear();
        this.month = this.startDate.getMonth();
        this.startTime = this.startDate.getTime();
    }

    private updateMemoList() {
        let from = this.startTime;
        let to = new Date(this.year, this.month + 1).getTime();
        this.state.memos = db.findBetween(from ,to);
        console.log(this.state.memos);
    }

}





function mapStateToProps(state: any, props: any) {
    return {
        month: state.timeReducers.month
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        toMonth: function(targetMonth: number) {
            dispatch({
                type: CHANGE_MONTH,
                month: targetMonth
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Month);