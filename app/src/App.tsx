import React from 'react';
import './App.scss';
import Logo from './assets/Logo.svg';
import { SearchBar } from './widgets/search';
import { filterButton, FilterOption, playButton, unavailableButton } from './widgets/widgets';
import * as Client from './client';
import { ratingWidget } from './widgets/rating';
import { addScroll } from './widgets/scroll';

interface State {
    filter: FilterOption;
    query: string;
    results: Client.Result[];
    page: number;
    total_pages: number;
}

const truncate = (s: string, limit: number) => s.length < limit ? s : s.substring(0, limit) + '...';

class App extends React.Component<object, State> {
    state = {
        filter: FilterOption.All,
        query: '',
        results: ((window as any).results || []) as Client.Result[],
        page: 0,
        total_pages: 0
    };
    setFilter(filter: FilterOption) {
        this.setState({...this.state, filter});
    }
    async query(query: string, page: number) {
        let {results, total_pages} = await Client.searchMulti(query, page);
        // skip results without images for now.
        results = results.filter(r => r.poster_path || r.profile_path);
        if (page > 1) {
            // append
            results = [...this.state.results, ...results];
        }
        (window as any).results = results;
        this.setState({...this.state, results, page, total_pages, query});
    }
    extendResults() {
        const {query, page, total_pages} = this.state;
        if (page < total_pages) {
            this.query(query, page + 1);
        }
    }
    row(r: Client.Result) {
        let info = '', year = '';
        const isPerson = r.media_type === 'person';
        if (isPerson) {
            if (r.gender || r.gender === 0) {
                info = 'Gender: ' + ['Male', 'Female', 'Other', 'Other'][r.gender];
            }
        } else {
            if (r.first_air_date || r.release_date) {
                const formatted = r.first_air_date ?
                    r.first_air_date.replaceAll('_', '/') :
                    (r.release_date as string).replaceAll('-', '/');
                info = 'Release date: ' + formatted;
                year = `(${formatted.split('/')[0]})`;
            }
        }
        const category = ({tv: 'TV', movie: 'Movie', person: 'People'})[r.media_type];
        const rating = r.vote_average ? r.vote_average * 10 : undefined;
        const viewLink = r.link ? playButton(r.link) : unavailableButton;
        return (
            <div key={r.id} className="result-row">
                <img src={Client.imgSrc(r.poster_path || r.profile_path as string)} />
                <div>
                    <div className="title">
                        {r.title || r.name} <span>{year}</span>
                    </div>
                    <div>
                        <label>{category}</label>
                        {info}
                    </div>
                    <div>
                        {truncate(r.overview, 379)}
                    </div>
                    {isPerson ? undefined : (
                        <div>
                            {ratingWidget(rating)}
                            {viewLink}
                        </div>
                        )}
                </div>
            </div>
        )
    }
    render() {
        const {filter, results} = this.state;

        // to show
        let toShow;
        if (filter !== FilterOption.All) {
            const filterValue = ({Movies: 'movie', 'TV Shows': 'tv', People: 'person'})[filter.valueOf()];
            toShow = results.filter(r => r.media_type === filterValue);
        } else {
            toShow = results;
        }

        // display count summary;
        let countSummary = '';
        if (toShow.length === 0) {
            countSummary = '0 results found';
        }
        if (toShow.length === 1) {
            countSummary = '1 result found';
        }

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

                    {countSummary ? (
                        <div className="single-result">
                            {countSummary}
                        </div>
                        ) : null}

                    <hr />

                    {toShow.map(r => this.row(r))}

                    {toShow.length ? (
                        <div
                            ref={el => addScroll(el, () => this.extendResults())}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
