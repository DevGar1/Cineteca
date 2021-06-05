const showFilm = (film) => {
    const {srcElement} = film;
    const {alt} = srcElement;
    console.log(`${location.origin}/proyecto-Final/pages/single-movie?name=${alt}`);
    location.href = `${location.origin}/proyecto-Final/pages/single-movie.html?name=${alt}`;
}
const init = () => {
    const btnSearch = document.getElementsByClassName('option');
    for (let img of btnSearch) {
        img.addEventListener('click', showFilm);
    }
};


const activeBtn = () => {
    const btnIn = document.getElementById('sign-in');
    const btnUp = document.getElementById('sign-up');

    btnIn.addEventListener('click', () => {
        location.href = `${location.origin}/proyecto-Final/pages/sign-in.html`;
    });
    btnUp.addEventListener('click', () => {
        location.href = `${location.origin}/proyecto-Final/pages/sign-up.html`;
    });

}


const searchMovie = () => {
    const title = document.getElementById('search-input').value;

};

export const activeSearchBtn = () => {
    const btn = document.getElementById('search-btn');

}

init();