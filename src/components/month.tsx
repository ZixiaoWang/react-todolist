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
    private weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    constructor(public props: any) {
        super(props);
    }

    renderHeader(): JSX.Element {
        
        let weekdays = this.weekdays.map((day: string, index: number) => {
            return <div key={ index } className="cell">{ day }</div>
        });

        return (
            <div className="grid-head">
                <div className="cell full-col month-header">
                    <div>
                        <span className="txt-lg">{ this.props.month }</span>
                        <span>&nbsp;</span>
                        <span className="txt-sm grey-4">{ this.props.year }</span>
                    </div>
                </div>
                { weekdays }
            </div>
        )
    }

    render() {
        return (
            <div className="grid-container">
                { this.renderHeader() }
                <div className="grid-body">

                </div>
            </div>
        )
    }

}