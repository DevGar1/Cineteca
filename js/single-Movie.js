import keys from './keys.js';
import {getFilmName, getUrlMovie} from './movieApi.js';
import {getUrlYoutube, getDataYoutube} from './youtubeApi.js';


const requestApi = (url) => {
    return fetch(url)
        .then(data => data.json())
        .catch(err => {
            console.log(err);
        });
}


const createAndSetElement = (typeElement, text) => {
    const element = document.createElement(typeElement);
    element.innerText = text;
    return element;
}

const addActors = (actors) => {
    const actorList = document.createElement('ul');
    const actorsArr = actors.split(',');
    for (let i = 0; i < actorsArr.length; i++) {
        const item = document.createElement('li');
        item.innerText = actorsArr[i];
        actorList.append(item);
    }
    return actorList;
}


const createDom = (response) => {
    const {
        Title, Year, Released, Runtime, Director, Actors, Plot,
        Poster, imdbRating
    } = response;
    const titleElement = createAndSetElement('h3', `${Title} (${Year}) ${imdbRating} Calf.`);
    const posterFilm = document.createElement('img');
    const descriptorFilm = createAndSetElement('p', Plot);
    const dataFilm = createAndSetElement('h5', `${Released} [${Runtime}] - ${Director}`);
    const info = document.createElement('div');
    const descriptorDiv = document.createElement('div');
    const titleDescriptor = createAndSetElement('h3', 'Description: ');
    const actorsDiv = document.createElement('div');
    const actorsTitle = createAndSetElement('h3', 'Actors: ');
    const container = document.getElementById('mainContainer');
    let actorsElement;

    posterFilm.src = Poster;
    info.className = 'info-film';

    if (Actors) {
        actorsElement = addActors(Actors);
    }
    descriptorDiv.append(titleDescriptor, descriptorFilm);
    actorsDiv.append(actorsTitle, actorsElement)
    if (container) {
        info.append(dataFilm, descriptorDiv, actorsDiv);
        container.append(titleElement, posterFilm, info);
    }
}

const insertElementYoutube = async (data) => {
    const div = document.getElementById('video-part');
    const video = document.createElement('iframe');
    video.width = '90%';
    video.height = '600px';
    video.src = `https://www.youtube.com/embed/${data['videoId']}`;
    video.title = 'Youtube video player';
    video.frameborder = '0';
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    if (div) {
        div.append(video);
    }
}


const init = async () => {
    const filmName = getFilmName();
    const movieKey = keys.movies_key;
    const urlMovie = getUrlMovie(filmName, movieKey);
    const responseMovie = await requestApi(urlMovie);
    createDom(responseMovie);
    const {Title} = responseMovie;
    const youtubeKey = keys.youtube_key;
    const urlYoutube = getUrlYoutube(Title, youtubeKey);
    const responseYoutube = await requestApi(urlYoutube);
    const youtubeData = getDataYoutube(responseYoutube);
    await insertElementYoutube(youtubeData);
}

init().then().catch();

export {
    requestApi
}

