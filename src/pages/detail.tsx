import * as React from 'react';
import { Component } from 'react';
import {  } from 'react-router-dom';

export class DetailPage extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className="section">
                    {/* HEADER */}
                    <div className="header">
                        <div className="header-btn-group">
                            <i className="header-btn material-icons">arrow_back</i>
                        </div>
                        <div className="header-btn-group">
                            <i className="header-btn material-icons">delete</i>
                        </div>
                    </div>
                    {/* FORM */}
                    <div className="body">
                        <div className="section form">
                            <div className="input-row">
                                <i className="materal-icons">title</i>
                                <div className="title">Theme</div>
                                <input type="text" className="input" placeholder="New Event"/>
                            </div>{/* Title */}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}