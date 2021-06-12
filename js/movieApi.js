const getOptionalFilm = urlParams => urlParams.has('name') ? urlParams.get('name') : 'nwa';

const getFilmName = () => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    return getOptionalFilm(urlParams);
}

const getUrlMovie = (filmTitle, key) => {
    return `https://www.omdbapi.com/?t=${filmTitle}&apikey=${key}`;
}

export {
    getFilmName,
    getUrlMovie
}

