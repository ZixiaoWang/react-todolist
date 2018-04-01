import * as React from 'react';
import { Component } from 'react';
import { memo } from '../utils/memo.interface';

export interface ListItemProps {
    event: memo
}

export class ListItem extends Component {

    private event: memo;

    constructor(public props: ListItemProps) {
        super(props);
        this.event = this.props.event;
    }

    render() {
        return (
            <div className="list-item">
                <div className="event">
                    <div className="event-time">
                        <div className="txt-md">{ this.event.startTime }</div>
                    </div>
                    <div className="event-detail">
                        <div className="txt-md">{ this.event.title }</div>
                        <div className="txt sm grey-4">{ this.event.notes }</div>
                    </div>
                </div>
            </div>
        )
    }
}

export class List extends Component {

    private events: memo[] = [];
    private month: string = '--';
    private year: string = '--';

    constructor(public props: any) {
        super(props);
    }

    renderList(): JSX.Element {
        let eventList = this.events.map((event, key) => {
            return <ListItem event={ event } key={ key } />
        });
        
        return (
            <div className="list-body">
                { eventList }
            </div>
        )
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