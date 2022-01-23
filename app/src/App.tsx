import React from 'react';
import './App.scss';
import Logo from './assets/Logo.svg';
import { SearchBar } from './widgets/search';
import { filterButton, FilterOption } from './widgets/widgets';

interface State {
    filter: FilterOption;
}

class App extends React.Component<object, object> {
    state = {
        filter: FilterOption.All
    };
    setFilter(filter: FilterOption) {
        this.setState({filter});
    }
    render() {
        const {filter} = this.state;
        return (
            <div className="App">
                <div className="header">
                    <img src={Logo}/>
                    <span>The Movie Finder Widget</span>
                </div>

                <div className="contents">
                    <SearchBar/>
                    {filterButton(FilterOption.All, filter, () => this.setFilter(FilterOption.All))}
                    {filterButton(FilterOption.Movies, filter, () => this.setFilter(FilterOption.Movies))}
                    {filterButton(FilterOption.TVShows, filter, () => this.setFilter(FilterOption.TVShows))}
                    {filterButton(FilterOption.People, filter, () => this.setFilter(FilterOption.People))}
                </div>
            </div>
        );
    }
}

export default App;
