import * as React from 'react';
import { Component } from 'react';

import { Nav } from '../components/nav';
import List from '../components/list';
import { timestampToDate } from '../utils/tools';

export class ListPage extends Component {

    constructor(public props: any) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            let date = this.props.hash || timestampToDate(Date.now());
            let listItem = document.getElementById(date);
            if(listItem) {
                listItem.scrollIntoView();
            }
        }, 0)
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