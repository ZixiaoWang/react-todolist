import * as React from 'react';
import { Component } from 'react';
import { Memo } from '../utils/interface';
import { db } from '../data/db';
import { guid, timestampToTime } from '../utils/tools';
import { history } from '../data/history';

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
        this.guid = this.props.guid || guid();
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

    setColor(color: string) {
        this.memo.color = color;
        this.setState({});
    }

    setValue(event: Event) {
        let name = event.target.name;
        this.memo[name] = event.target.value;
    }

    back() {
        history.goBack();
    }

    save() {
        console.log(this.memo);
        if( this.props.action(this.memo, this.guid) ) {
            alert('Successfully Saved');
        }
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
                                <i className="header-btn material-icons" onClick={ this.save.bind(this) } >save</i>
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
                            <input name="title" type="text" 
                                className="input" placeholder="New Event" 
                                onChange={ this.setValue.bind(this) }
                                defaultValue={ this.memo.title }/>
                        </div>{/* Title */}
                        <div className="half-col">
                            <i className="material-icons">timer</i>
                            <div className="title">Start Time</div>
                            <input name="startTime" type="time" 
                                className="input" 
                                onChange={ this.setValue.bind(this) }
                                defaultValue={ timestampToTime(this.memo.startTime) }/>
                        </div>{/* Start Time */}
                        <div className="half-col">
                            <i className="material-icons">timer_off</i>
                            <div className="title">End Time</div>
                            <input name="endTime" type="time" 
                                className="input" 
                                onChange={ this.setValue.bind(this) }
                                defaultValue={ timestampToTime(this.memo.endTime) } />
                        </div>{/* End Time */}
                        <div className="input-row">
                            <i className="material-icons">location_on</i>
                            <div className="title">Location (if any)</div>
                            <input name="location" type="text" 
                                className="input" 
                                onChange={ this.setValue.bind(this) }
                                defaultValue={ this.memo.location } />
                        </div>{/* Location */}
                        <div className="input-row">
                            <i className="material-icons">network_wifi</i>
                            <div className="title">URL (if any)</div>
                            <input name="url" type="text" 
                                className="input" 
                                onChange={ this.setValue.bind(this) }
                                defaultValue={ this.memo.url } />
                        </div>{/* URL */}
                        <div className="input-row">
                            <i className="material-icons">palettes</i>
                            <div className="title">Pick a Color</div>
                            <div className="color-palettes">
                                <div className={ "color urgent" + (this.memo.color === 'urgent' ? ' active' : '') } onClick={ this.setColor.bind(this, 'urgent') }></div>
                                <div className={ "color blue" + (this.memo.color === 'blue' ? ' active' : '') } onClick={ this.setColor.bind(this, 'blue') }></div>
                                <div className={ "color green" + (this.memo.color === 'green' ? ' active' : '') } onClick={ this.setColor.bind(this, 'green') }></div>
                                <div className={ "color yellow" + (this.memo.color === 'yellow' ? ' active' : '') } onClick={ this.setColor.bind(this, 'yellow') }></div>
                                <div className={ "color purple" + (this.memo.color === 'purple' ? ' active' : '') } onClick={ this.setColor.bind(this, 'purple') }></div>
                                <div className={ "color none" + (this.memo.color === 'normal' ? ' active' : '') } onClick={ this.setColor.bind(this, 'normal') }></div>
                            </div>
                        </div>{/* Colors */}
                        <div className="input-row">
                            <i className="material-icons">note_add</i>
                            <div className="title">Notes</div>
                            <textarea name="notes" 
                                className="input" 
                                onChange={ this.setValue.bind(this) }
                                defaultValue={ this.memo.notes }></textarea>
                        </div>{/* URL */}
                    </div>
                </div>
            </div>
        )
    }
}