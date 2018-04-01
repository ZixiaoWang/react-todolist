import * as React from 'react';
import { Component } from 'react';

import { Nav } from '../components/nav';
import { Month } from '../components/month';
import { List } from '../components/list';

export class AppComponent extends Component<{}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="app">
                <Nav />
                <Month year="2018" month="3"/>
                {/* <List /> */}
            </div>
        )
    }
}