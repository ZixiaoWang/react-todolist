import * as React from 'react';
import { Component } from 'react';

export class Logo extends Component {
    
    render() {
        return (
            <strong className="txt-xl">
                <span className="yellow">M</span>
                <span className="green">E</span>
                <span className="blue">M</span>
                <span className="urgent">O</span>
            </strong>
        )
    }
}

export class NavButtonGroup extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
            <div className="header-btn-group">
                { this.props.children }
            </div>
        )
    }
}

export class NavButton extends Component {

    public state: any = {
        fontSize: '24px',
        color: 'black'
    }

    constructor(public props: any) {
        super(props);
        this.state.fontSize = this.props.fontSize || this.state.fontSize;
        this.state.color = this.props.color || this.props.color;
    }

    render() {
        return (
            <i  className="header-btn material-icons"
                style={ this.state }
                >{ this.props.icon }
            </i>
        )
    }
}

export class Nav extends Component {

    constructor(public props: any) {
        super(props);
    }

    render() {
        return (
            <header>
                <div className="section">
                    <div className="header">
                        <Logo />
                        <NavButtonGroup>
                            <NavButton icon="search" onClick=""/>
                            <NavButton icon="view_module" onClick=""/>
                            <NavButton icon="add_circle_outline" onClick=""/>
                        </NavButtonGroup>
                    </div>
                </div>
            </header>
        )
    }
}