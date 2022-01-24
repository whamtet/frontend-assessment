const base_url = 'https://api.themoviedb.org/3';
const api_key = process.env['REACT_APP_TMDB'];

type MediaType = 'tv' | 'movie' | 'person';
export interface Result {
    id: number;
    name?: string;
    title?: string;
    vote_average: number;
    first_air_date?: string;
    release_date?: string;
    media_type: MediaType;
    overview: string;
    poster_path?: string;
    profile_path?: string;
    gender?: number;
    link?: string;
}

interface ResultMulti {
    page: number;
    results: Result[];
    total_pages: number;
}

interface Person {
    biography: string;
}
interface VideoResult {
    site: string;
    key: string;
}
interface Video {
    results: VideoResult[];
}

const searchPerson = async (id: number): Promise<Person> => {
    const queryString = new URLSearchParams({api_key} as any);
    const response = await fetch(base_url + '/person/' + id + '?' + queryString);
    return response.json();
}

export const searchVideos = async (media_type: string, id: number): Promise<Video> => {
    const queryString = new URLSearchParams({api_key} as any);
    const response = await fetch(`${base_url}/${media_type}/${id}/videos?${queryString}`);
    return response.json();
}

export const searchMulti = async (query: string, page: number): Promise<ResultMulti> => {
    const queryString = new URLSearchParams({query, api_key, page} as any);
    const response = await fetch(base_url + '/search/multi?' + queryString);

    const data = await response.json() as ResultMulti;

    for (const r of data.results) {
        if (r.media_type === 'person') {
            // need to query biography
            const details = await searchPerson(r.id);
            r.overview = details.biography;
        } else {
            // need to query
            const videos = await searchVideos(r.media_type, r.id);
            for (const videoResult of videos.results) {
                if (videoResult.site === 'YouTube') {
                    r.link = 'https://www.youtube.com/watch?v=' + videoResult.key;
                    break;
                } else {
                    // TODO
                }
            }
        }
    }

    return data;
};

export const imgSrc = (s: string) => 'https://image.tmdb.org/t/p/w185' + s
