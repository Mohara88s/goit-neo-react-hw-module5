import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_THEMOVIEDB_ACCESS_KEY;

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const options = {
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Authorization: `Bearer ${ACCESS_KEY}`
    }
};

export const fetchTrendingMoviesToday = async () => {
    const response = await axios.get('trending/movie/day', options)
    return response.data;
};

export const fetchMoviesByQuery = async (searchQuery) => {
    const response = await axios.get('/search/movie', {
        ...options,
        params: {
            query: searchQuery,
        },
    })
    return response.data;
}

export const fetchMovieById = async (movieId) => {
    const response = await axios.get(`movie/${movieId}`, options)
    return response.data;
}

export const fetchMovieCastById = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/credits`, options)
    return response.data;
}

export const fetchMovieReviewsById = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/reviews`, options)
    return response.data;
}
