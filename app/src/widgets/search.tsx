import search from '../assets/Icons-search.svg';
import './search.scss';

import * as React from 'react';

interface State {
    query: string;
}

export class SearchBar extends React.Component<object, State> {
    state = {
        query: ''
    }
    updateQuery(query: string) {
        this.setState({query});
    }
    searchSection() {
        const {query} = this.state;
        return (
            <div className="search-input">
                <img src={search}/>
                <input
                    onChange={e => this.updateQuery(e.target.value)}
                    placeholder="Search for movies, TV shows or people..."
                    value={query}
                />
                {query ? (
                    <div
                        className="clear-text"
                        onClick={() => this.updateQuery('')}
                    >
                        Clear
                    </div>
                ) : null}
            </div>
        );
    }
    render() {
        return (
            <div className="search-bar">
                {this.searchSection()}
                <button>
                    Search
                </button>
            </div>
        );
    }
}
