import search from '../assets/Icons-search.svg';
import './search.scss';

import * as React from 'react';

interface Props {
    search: (s: string) => void;
}

interface State {
    query: string;
}

export class SearchBar extends React.Component<Props, State> {
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
                    type="text"
                    onChange={e => this.updateQuery(e.target.value)}
                    placeholder="Search for movies, tv shows or people..."
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
        const {search} = this.props;
        const {query} = this.state;
        const onSubmit = (e: any) => {
            e.preventDefault();
            if (query) {
                search(query);
            }
        }
        return (
            <form onSubmit={onSubmit} className="search-bar">
                {this.searchSection()}
                <input type="submit" value="Search" />
            </form>
        );
    }
}
