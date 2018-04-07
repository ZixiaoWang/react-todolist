import * as React from 'react';
import { Component } from 'react';

import { Nav } from '../components/nav';
import List from '../components/list';

export class ListPage extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
            <div id="app">
                <Nav icon="view_module" />
                <List />
            </div>
        )
    }
}