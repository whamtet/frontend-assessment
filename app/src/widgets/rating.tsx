import './rating.scss';

type OptionalNum = number | undefined;

export const ratingWidget = (rating: OptionalNum) => {
    const scoreMessage = (
        rating || rating === 0 ? rating.toFixed(0) + ' %' :
            'Not rated'
    );
    const colorClass = (
        rating === undefined ? undefined :
            rating < 40 ? 'rating-bar rating-red' :
                rating < 70 ? 'rating-bar rating-yellow' :
                    'rating-bar rating-green'
    );
    const width = rating + '%';

    return (
        <div className="rating">
            <div>
                User Score: <b>{scoreMessage}</b>
            </div>
            <div className="rating-bar">
                <div className={colorClass} style={{width}} />
            </div>
        </div>
    );
};
