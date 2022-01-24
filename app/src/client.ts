const base_url = 'https://api.themoviedb.org/3';
const api_key = process.env['REACT_APP_TMDB'];

type MediaType = 'tv' | 'movie' | 'person';
export interface Result {
    name: string;
    vote_average: number;
    first_air_date: string;
    media_type: MediaType;
    overview: string;
    backdrop_path: string;
}

interface ResultMulti {
    page: number;
    results: Result[];
    total_pages: number;
}

export const searchMulti = async (query: string, page: number): Promise<ResultMulti> => {
    const queryString = new URLSearchParams({query, api_key, page} as any); // typechecker is broken here
    const response = await fetch(base_url + '/search/multi?' + queryString);
    return response.json();
};
