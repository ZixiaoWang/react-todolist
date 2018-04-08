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
import { db } from './data/db';

export class AppComponent extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
        <Provider store={ store }>
            <BrowserRouter>
                <Switch>
                    <Route path="/edit/:guid" render={({ match }) => <DetailPage guid={ match.params.guid} action={ db.update.bind(db) } />} />
                    <Route path="/new/:guid" render={({ match }) => <DetailPage guid={ match.params.guid } action={ db.insert.bind(db) } />} />
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
    document.getElementById('root')
);