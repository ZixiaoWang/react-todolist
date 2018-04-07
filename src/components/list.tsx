import * as React from 'react';
import { Component } from 'react';
import { Memo } from '../utils/interface';
import { GET_ALL_MEMOS } from '../redux/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface ListItemProps {
    event: Memo
}

export class ListItem extends Component {

    private event: Memo;

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

class List extends Component {

    private month: string = '--';
    private year: string = '--';

    constructor(public props: any) {
        super(props);
    }

    renderList(): JSX.Element {
        let memoList = this.props.events || [];
        let memoViewList = memoList.map((event: Memo, key: number) => {
            return <ListItem event={ event } key={ key } />
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
        events: state
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