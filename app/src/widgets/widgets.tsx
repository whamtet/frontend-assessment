import './widgets.scss';
import notallowed from '../assets/notallowed.svg';

export const playButton = (href: string) => (
    <button className="btn btn-available" onClick={() => window.open(href)}>
        <i className="fa fa-play" /> Play Trailer
    </button>
);

// we use inline css because we wish to bundle image
const cursor = `url("${notallowed}"), not-allowed`;
export const unavailableButton = (
    <button className="btn btn-unavailable" style={{cursor}}>
            <i className="fa fa-play" /> Trailer Unavailable
    </button>
);

export enum FilterOption {
    All = "All",
    Movies = "Movies",
    TVShows = "TV Shows",
    People = "People"
}

export const filterButton = (option: FilterOption, state: FilterOption, update: () => void) => (
    <button
        className={option === state ? 'btn-filter selected' : 'btn-filter'}
        onClick={update}
    >
        {option.valueOf()}
    </button>
);
