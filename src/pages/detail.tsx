import * as React from 'react';
import { Component } from 'react';
import { Memo } from '../utils/interface';
import { db } from '../data/db';
import { guid, timestampToTime } from '../utils/tools';

const emptyMemo: Memo = {
    guid: guid(),
    title: '',
    startTime: Date.now(),
    endTime: Date.now() + 1000 * 60 * 60,
    location: '',
    url: '',
    color: 'normal',
    notes: ''

}

export class DetailPage extends Component {

    private guid: string;
    private memo: Memo = emptyMemo;

    constructor(public props: any) {
        super(props);
        this.guid = this.props.match.params.guid || 'new';
    }

    componentWillMount() {
        let protocol = location.protocol;
        let host = location.host;
        let regex = new RegExp(protocol + '//' + host + '/(grid|list)');

        if(regex.test(document.referrer) === false) {
            location.replace('/list');
        }

        if(this.guid !== 'new' && db.has(this.guid)) {
            this.memo = db.query(this.guid) as Memo;
        }
    }

    back() {
        history.back();
    }

    render() {
        return (
            <div id="app">
                <header>
                    <div className="section">
                        {/* HEADER */}
                        <div className="header">
                            <div className="header-btn-group" onClick={ this.back.bind(this) }>
                                <i className="header-btn material-icons">arrow_back</i>
                                <span className="header-btn txt-lg">Back</span>
                            </div>
                            <div className="header-btn-group">
                                <i className="header-btn material-icons">delete</i>
                            </div>
                        </div>
                        {/* FORM */}
                    </div>
                </header>
                <div className="body">
                    <div className="section form">
                        <div className="input-row">
                            <i className="material-icons">title</i>
                            <div className="title">Theme</div>
                            <input type="text" className="input" placeholder="New Event" defaultValue={ this.memo.title }/>
                        </div>{/* Title */}
                        <div className="half-col">
                            <i className="material-icons">timer</i>
                            <div className="title">Start Time</div>
                            <input type="time" className="input" defaultValue={ timestampToTime(this.memo.startTime) }/>
                        </div>{/* Start Time */}
                        <div className="half-col">
                            <i className="material-icons">timer_off</i>
                            <div className="title">End Time</div>
                            <input type="time" className="input" defaultValue={ timestampToTime(this.memo.endTime) } />
                        </div>{/* End Time */}
                        <div className="input-row">
                            <i className="material-icons">location_on</i>
                            <div className="title">Location (if any)</div>
                            <input type="text" className="input" defaultValue={ this.memo.location } />
                        </div>{/* Location */}
                        <div className="input-row">
                            <i className="material-icons">network_wifi</i>
                            <div className="title">URL (if any)</div>
                            <input type="text" className="input" defaultValue={ this.memo.url } />
                        </div>{/* URL */}
                        <div className="input-row">
                            <i className="material-icons">palettes</i>
                            <div className="title">Pick a Color</div>
                            <div className="color-palettes">
                                <div className="color urgent"></div>
                                <div className="color blue"></div>
                                <div className="color green"></div>
                                <div className="color yellow"></div>
                                <div className="color purple"></div>
                                <div className="color none"></div>
                            </div>
                        </div>{/* Colors */}
                        <div className="input-row">
                            <i className="material-icons">note_add</i>
                            <div className="title">Notes</div>
                            <textarea className="input" defaultValue={ this.memo.notes }></textarea>
                        </div>{/* URL */}
                    </div>
                </div>
            </div>
        )
    }
}