import {getUrlMovie} from "./movieApi.js";
import {requestApi} from "./single-Movie.js";

const redirect = (titleFilm) => {
    location.href = `${location.origin}/pages/single-movie.html?name=${titleFilm}`;
}

const showFilmPage = (filmName) => {
    const {srcElement} = filmName;
    const {alt} = srcElement;
    redirect(alt);
}

const changePage = (path) => {
    location.href = `${location.origin}/pages/${path}.html`;
}

const setAlert = () => {
    const alert = document.getElementsByClassName('alert');
    alert[0].style.display = 'block'
}

const searchMovie = async () => {
    try {
        let title = document.getElementById("search-input");
        title = title.value;
        const urlMovie = getUrlMovie(title)
        const movie = await requestApi(urlMovie);
        if (movie.hasOwnProperty('Title')) {
            const {Title} = movie;
            redirect(Title);
        } else {
            setAlert();
        }
    } catch (e) {
        setAlert()
    }
};

export const activeSearchBtn = () => {
    const btn = document.getElementById('search-btn');
    btn.addEventListener('click', searchMovie);
}


const activeBtn = () => {
    const btnIn = document.getElementById('sign-in');
    const btnUp = document.getElementById('sign-up');

    btnIn.addEventListener('click', () => {
        changePage('sign-in');
    });
    btnUp.addEventListener('click', () => {
        changePage('sign-up')
    });
    activeSearchBtn();
}


const init = () => {
    const btnSearch = document.getElementsByClassName('option');
    for (let img of btnSearch) {
        img.addEventListener('click', showFilmPage);
    }
    activeBtn();
};


init();