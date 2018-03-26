import * as React from 'react';
import { Component } from 'react';

export class AppComponent extends Component<{}> {

    public state: any = {
        title: 'Hello World',
        description: 'This is a "Hello World" project by using ReactJS + TypeScript'
    }

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{ this.state.title }</h1>
                <p>{ this.state.description }</p>
                <hr/>
            </div>
        )
    }
}