import React from 'react';
import './App.scss';
import Logo from './assets/Logo.svg';
import { SearchBar } from './widgets/search';
import { filterButton, FilterOption } from './widgets/widgets';

interface State {
    filter: FilterOption;
    results: object[];
}

class App extends React.Component<object, object> {
    state = {
        filter: FilterOption.All,
        results: []
    };
    setFilter(filter: FilterOption) {
        this.setState({filter});
    }
    render() {
        const {filter, results} = this.state;
        return (
            <div className="App">
                <div className="header">
                    <img src={Logo}/>
                    <span>The Movie Finder Widget</span>
                </div>

                <div className="contents">
                    <div className="search-options">
                        <SearchBar/>
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
