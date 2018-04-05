import * as React from 'react';
import { Component } from 'react';

import { Nav } from '../components/nav';
import Month from '../components/month';

export class GridPage extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
            <div id="app">
                <Nav icon="view_list" />
                <Month />
            </div>
        )
    }
}