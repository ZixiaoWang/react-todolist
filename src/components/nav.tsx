import * as React from 'react';
import { Component } from 'react';
import { guid } from '../utils/tools';
import { history } from '../data/history';

export class Logo extends Component {
    
    goToHome(): void{
        location.href = '/grid';
    }

    render() {
        return (
            <strong 
                className="txt-xl" 
                onClick={ this.goToHome }>
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
                onClick={ this.props.onClick }
                style={ this.state }
                >{ this.props.icon }</i>
        )
    }
}

export class Nav extends Component {

    private icon: string;

    constructor(public props: any) {
        super(props);
        this.icon = this.props.icon || 'view_list';
    }

    gotoSearch(): void {
        history.push('/search');
    }

    toggleView(): void {
        let href = '/list';
        if(this.icon === 'view_module') {
            href = '/grid';
        }
        history.push(href);
    }

    gotoEditPage(): void {
        let href = '/new/' + guid();
        history.push(href);
    }

    render() {
        return (
            <header>
                <div className="section">
                    <div className="header">
                        <Logo />
                        <NavButtonGroup>
                            <NavButton icon="search" onClick={ this.gotoSearch }/>
                            <NavButton icon={ this.icon } onClick={ this.toggleView.bind(this) } />
                            <NavButton icon="add_circle_outline" onClick={ this.gotoEditPage } />
                        </NavButtonGroup>
                    </div>
                </div>
            </header>
        )
    }
}