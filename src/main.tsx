import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, Reducer } from 'redux';

import { DetailPage } from './pages/detail';
import { SearchPage } from './pages/search';
import { store } from './redux/store';
import { db } from './data/db';
import { history } from './data/history';
import { ListPage } from './pages/list';
import { GridPage } from './pages/grid';

export class AppComponent extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
        <Provider store={ store }>
            <Router history={ history }>
                <Switch>
                    <Route path="/edit/:guid" render={({ match }) => <DetailPage guid={ match.params.guid} action={ db.update.bind(db) } />} />
                    <Route path="/new/:guid/:startTime" render={({ match }) => <DetailPage startTime={ match.params.startTime } guid={ match.params.guid } action={ db.insert.bind(db) } />} />
                    <Route path="/new/:guid" render={({ match }) => <DetailPage guid={ match.params.guid } action={ db.insert.bind(db) } />} />
                    <Route path="/search" component={ SearchPage } />
                    <Route path="/list/:date" render={({ match }) => <ListPage hash={ match.params.date }/>} />
                    <Route path="/list" component={ ListPage } />
                    <Route path="/grid" component={ GridPage } />
                    <Redirect to="/grid" />
                </Switch>
            </Router>
        </Provider>
        )
    }
}

render(
    <AppComponent />,
    document.getElementById('root')
);