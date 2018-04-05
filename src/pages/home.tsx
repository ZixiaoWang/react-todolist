import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

import { GridPage } from './grid';
import { ListPage } from './list';

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