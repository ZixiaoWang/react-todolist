import * as React from 'react';
import { Component } from 'react'

export class SearchPage extends Component {

    constructor(public props: any) {
        super(props);
    }

    componentWillMount() {
        let protocol = location.protocol;
        let host = location.host;
        let regex = new RegExp(protocol + '//' + host + '/(grid|list)');

        if(regex.test(document.referrer) === false) {
            location.replace('/grid');
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
                        <div className="header">
                            <div className="header-btn-group">
                                <i 
                                    className="material-icons header-btn"
                                    onClick={ this.back.bind(this) }>arrow_back
                                </i>
                                <input type="text" className="input" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="body">

                </div>
            </div>
        )
    }
}