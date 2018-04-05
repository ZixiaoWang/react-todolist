import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, Reducer } from 'redux';

import { DetailPage } from './pages/detail';
import { SearchPage } from './pages/search';
import { Home } from './pages/home';
import { store } from './redux/store';

export class AppComponent extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
        <Provider store={ store }>
            <BrowserRouter>
                <Switch>
                    <Route path="/edit/:timestamp" component={ DetailPage } />
                    <Route path="/search" component={ SearchPage } />
                    <Route path="/" component={ Home } />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </Provider>
        )
    }
}

render(
    <AppComponent />,
    document.body
);