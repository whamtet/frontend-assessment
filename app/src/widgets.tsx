import './widgets.css';
import notallowed from './assets/notallowed.svg';

export const playButton = (
    <button className="btn btn-available">
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

