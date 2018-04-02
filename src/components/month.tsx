import * as React from 'react';
import { Component } from 'react';

interface CellProps {
    date: number;
    inactive: boolean;
    events: Array<{ type: string }>
}

export class Cell extends Component {

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
            this.props.events.map((event: any) => {
                let classList = 'cell-event ' + event.type;
                return <div className={ classList }></div>
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

export class Month extends Component {

    public state: any;
    private months: any = {
        "1": 'Jan', "2": 'Feb',
        "3": 'Mar', "4": 'Apr',
        "5": 'May', "6": 'Jun',
        "7": 'Jul', "8": 'Aug',
        "9": 'Sep', "10": 'Oct',
        "11": 'Nov',"12": 'Dec'
    }
    private weekdays: string[] = [
        'Sun', 'Mon', 'Tue', 'Wed', 
        'Thu', 'Fri', 'Sat'
    ];
    private year: number;
    private month: number;

    constructor(public props: any) {
        super(props);

        let date = new Date();
        this.year = this.props.year || date.getFullYear();
        this.month = this.props.month || date.getMonth();
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

        for(let i=1; i<=35; i++) {
            cells.push(
                <Cell key={i} date={i} inactive={false} events={[]}></Cell>
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