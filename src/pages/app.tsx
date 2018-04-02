import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

import { GridPage } from './grid';
import { ListPage } from './list';
import { DetailPage } from './detail';
import { SearchPage } from './search';

export class Home extends Component<{}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter basename="/">
                <Switch>
                    <Route path="/list" component={ ListPage } />
                    <Route path="/grid" component={ GridPage } />
                    <Redirect to="/grid" />
                </Switch>
            </BrowserRouter>
        )
    }
}

export class AppComponent extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/edit/:timestamp" component={ DetailPage } />
                    <Route path="/search" component={ SearchPage } />
                    <Route path="/" component={ Home } />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}