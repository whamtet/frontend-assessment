import './search.css';
import search from './assets/Icons-search.svg';

export const searchBar = (
    <div className="search-bar">
        <img src={search} />
        <input placeholder="Search for movies, TV shows or people..." />
        <button>
            Search
        </button>
    </div>
);
