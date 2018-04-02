import * as React from 'react';
import { Component } from 'react';
import {  } from 'react-router-dom';

export class DetailPage extends Component {

    private timestamp: number;

    constructor(public props: any) {
        super(props);
        this.timestamp = this.props.match.params.timestamp || Date.now();
    }

    render() {
        return (
            <div id="app">
                <header>
                    <div className="section">
                        {/* HEADER */}
                        <div className="header">
                            <div className="header-btn-group">
                                <i className="header-btn material-icons">arrow_back</i>
                                <span className="header-txt txt-lg">Back</span>
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
                            <input type="text" className="input" placeholder="New Event"/>
                        </div>{/* Title */}
                        <div className="half-col">
                            <i className="material-icons">timer</i>
                            <div className="title">Start Time</div>
                            <input type="time" className="input"/>
                        </div>{/* Start Time */}
                        <div className="half-col">
                            <i className="material-icons">timer_off</i>
                            <div className="title">End Time</div>
                            <input type="time" className="input"/>
                        </div>{/* End Time */}
                        <div className="input-row">
                            <i className="material-icons">location_on</i>
                            <div className="title">Location (if any)</div>
                            <input type="text" className="input"/>
                        </div>{/* Location */}
                        <div className="input-row">
                            <i className="material-icons">network_wifi</i>
                            <div className="title">URL (if any)</div>
                            <input type="text" className="input"/>
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
                            <textarea className="input"></textarea>
                        </div>{/* URL */}
                    </div>
                </div>
            </div>
        )
    }
}