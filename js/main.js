import {getMovie} from './single-Movie.js';

const showFilm = (film) => {
    const {srcElement} = film;
    const {alt} = srcElement;
    location.href = `${location.origin}/proyecto-Final/pages/single-movie.html?name=${alt}`;
}

const redirect = (titleFilm) => {
    location.href = `${location.origin}/proyecto-Final/pages/single-movie.html?name=${titleFilm}`;
}
const setAlert = () => {
    const alert = document.getElementsByClassName('alert');
    alert[0].style.display = 'block'
}
const searchMovie = async () => {
    try {
        let title = document.getElementById("search-input");
        title = title.value;
        let movie = await getMovie(title);
        movie = await movie.json();
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
        location.href = `${location.origin}/proyecto-Final/pages/sign-in.html`;
    });
    btnUp.addEventListener('click', () => {
        location.href = `${location.origin}/proyecto-Final/pages/sign-up.html`;
    });
    activeSearchBtn();
}


const init = () => {
    const btnSearch = document.getElementsByClassName('option');
    for (let img of btnSearch) {
        img.addEventListener('click', showFilm);
    }
    activeBtn();
};


init();