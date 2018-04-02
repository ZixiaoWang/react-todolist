import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

import { Nav } from '../components/nav';
import { Month } from '../components/month';
import { List } from '../components/list';

export class Home extends Component<{}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter basename="/">
                <div id="app">
                    <Nav />
                    <Switch>
                        <Redirect exact from="/" to="/grid" />
                        <Route path="/list" component={ List } />
                        <Route path="/grid" component={ Month } />
                    </Switch>
                </div>
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
                    {/* <Route path="/edit" component={  } /> */}
                    <Route path="/" component={ Home } />
                </Switch>
            </BrowserRouter>
        )
    }
}