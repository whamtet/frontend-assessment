import React from 'react';
import './App.scss';
import Logo from './assets/Logo.svg';
import { SearchBar } from './widgets/search';
import { filterButton, FilterOption } from './widgets/widgets';
import * as Client from './client';

interface State {
    filter: FilterOption;
    query: string;
    results: Client.Result[];
    page: number;
    total_pages: number;
}

class App extends React.Component<object, State> {
    state = {
        filter: FilterOption.All,
        query: '',
        results: [],
        page: 0,
        total_pages: 0
    };
    setFilter(filter: FilterOption) {
        this.setState({...this.state, filter});
    }
    async query(query: string, page: number) {
        let {results, total_pages} = await Client.searchMulti(query, page);
        results = [...this.state.results, ...results];
        this.setState({...this.state, results, page, total_pages, query});
    }
    extendResults() {
        const {query, page, total_pages} = this.state;
        if (page < total_pages) {
            this.query(query, page + 1);
        }
    }
    render() {
        const {query, filter, results} = this.state;
        return (
            <div className="App">
                <div className="header">
                    <img src={Logo}/>
                    <span>The Movie Finder Widget</span>
                </div>

                <div className="contents">
                    <div className="search-options">
                        <SearchBar search={(s: string) => this.query(s, 1)} />
                        {filterButton(FilterOption.All, filter, () => this.setFilter(FilterOption.All))}
                        {filterButton(FilterOption.Movies, filter, () => this.setFilter(FilterOption.Movies))}
                        {filterButton(FilterOption.TVShows, filter, () => this.setFilter(FilterOption.TVShows))}
                        {filterButton(FilterOption.People, filter, () => this.setFilter(FilterOption.People))}
                    </div>

                    {results.length === 1 ? (
                        <div className="single-result">
                            1 result found
                        </div>
                        ) : null}

                    <hr />
                </div>
            </div>
        );
    }
}

export default App;
