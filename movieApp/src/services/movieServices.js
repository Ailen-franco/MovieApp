const key = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3"

const endpoints = {
    popular: `${baseUrl}/movie/popular?api_key=${key}&language=es-ES`,
    topRated: `${baseUrl}/movie/top_rated?api_key=${key}&language=es-ES`,
    latest: `${baseUrl}/movie/now_playing?api_key=${key}&language=es-ES`,
   
}

export function createImageUrl(filename, size) {
    return `https://image.tmdb.org/t/p/${size}/${filename}`
}

export default endpoints