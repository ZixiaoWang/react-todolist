import * as React from 'react';
import { Component } from 'react'
import { db } from '../data/db';
import { Memo } from '../utils/interface';
import { ListItem } from '../components/list';

export class SearchPage extends Component<{}, {[key: string]: any}> {

    private inputTimer: number = 0;

    constructor(public props: any) {
        super(props);
        this.state = {
            memoList: []
        }
    }

    componentWillMount() {
        let protocol = location.protocol;
        let host = location.host;
        let regex = new RegExp(protocol + '//' + host + '/(grid|list)');
    }

    back() {
        history.back();
    }

    search(event: React.ChangeEvent<HTMLInputElement>) {
        let keyword = event.target.value;

        clearTimeout(this.inputTimer);
        this.inputTimer = window.setTimeout(() => {
            this.setState({
                memoList: keyword === '' ? [] : db.search(keyword)
            })
        }, 200);
    }

    render() {
        return (
            <div id="app">
                <header>
                    <div className="section">
                        <div className="header">
                            <div className="header-btn-group">
                                <i 
                                    className="material-icons header-btn"
                                    onClick={ this.back.bind(this) }>arrow_back
                                </i>
                                <input 
                                    ref="searchbox"
                                    onChange={ this.search.bind(this) }
                                    type="text" className="input" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="body">
                    <div className="list-container">
                        {
                            this.state.memoList.length === 0 ? 
                            <div className="error-panel"> Sorry, cannot find any memo </div> :
                            this.state.memoList.map((memo: Memo, index: number) => {
                                return <ListItem events={ [memo] } key={ index } />;
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}