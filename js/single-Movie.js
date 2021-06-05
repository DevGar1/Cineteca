import keys from './keys.js';
//
// const data = {
//     Actors: "Mark Wahlberg, Tim Roth, Helena Bonham Carter, Michael Clarke Duncan",
//     Awards: "Nominated for 2 BAFTA Film Awards. Another 11 wins & 30 nominations.",
//     BoxOffice: "$180,011,740",
//     Country: "USA",
//     DVD: "25 Nov 2015",
//     Director: "Tim Burton",
//     Genre: "Action, Adventure, Sci-Fi, Thriller",
//     Language: "English",
//     Metascore: "50",
//     Plot: "In 2029, an Air Force astronaut crash-lands on a mysterious planet where evolved, talking apes dominate a race of primitive humans.",
//     Poster: "https://m.media-amazon.com/images/M/MV5BY2RlMDhlY2MtMjQ1Zi00NzI5LTgxOTgtZjliNWMzYTY3NWZkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     Production: "Zanuck Company, Twentieth Century Fox",
//     Rated: "PG-13",
//     Ratings: 2,
//     Released: "27 Jul 2001",
//     Response: "True",
//     Runtime: "119 min",
//     Title: "Planet of the Apes",
//     Type: "movie",
//     Website: "N/A",
//     Writer: "Pierre Boulle (novel), William Broyles Jr. (screenplay), Lawrence Konner (screenplay), Mark Rosenthal (screenplay)",
//     Year: "2001",
//     imdbID: "tt0133152",
//     imdbRating: "5.7",
//     imdbVotes: "212,007",
// }

const getFilmInfo = () => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    if (urlParams.has('name')) {
        return urlParams.get('name');
    } else {
        return 'nwa';
    }
}

const createAndSetElement = (typeElement, text) => {
    const element = document.createElement(typeElement);
    element.innerText = text;
    return element;
}

const addActors = (actors) => {
    const actorList = document.createElement('ul');
    const actorsArr = actors.split(',');
    console.log(actorsArr)
    for (let i = 0; i < actorsArr.length; i++) {
        const item = document.createElement('li');
        item.innerText = actorsArr[i];
        actorList.append(item);
    }
    return actorList;
}


const createDom = async (response) => {
    const {
        Title, Year, Released, Runtime, Director, Actors, Plot,
        Poster, imdbRating
    } = response;
    const titleElement = createAndSetElement('h3', `${Title} (${Year}) ${imdbRating} Calf.`);
    const posterFilm = document.createElement('img');
    posterFilm.src = Poster;
    const descriptorFilm = createAndSetElement('p', Plot);
    const dataFilm = createAndSetElement('h5', `${Released} [${Runtime}] - ${Director}`);
    let actorsElement;
    if (Actors) {
        actorsElement = addActors(Actors);
    }

    const info = document.createElement('div');
    info.className = 'info-film';

    const descriptorDiv = document.createElement('div');
    const titleDescriptor = createAndSetElement('h3', 'Description: ');
    descriptorDiv.append(titleDescriptor, descriptorFilm);


    const actorsDiv = document.createElement('div');
    const actorsTitle = createAndSetElement('h3', 'Actors: ');
    actorsDiv.append(actorsTitle, actorsElement)

    const container = document.getElementById('mainContainer');

    info.append(dataFilm, descriptorDiv, actorsDiv);
    container.append(titleElement, posterFilm, info);

}

const getDataYoutube = async (title) => {
    title = title.replaceAll(' ', '%20');
    title = title.trim();
    console.log(title)
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}%20film&key=${keys.youtube_key}`;
    let response = await fetch(url);
    response = await response.json();
    const {items} = response;
    return items[0].id;
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
    div.append(video);
}

const init = async () => {
    const filmTitle = getFilmInfo();
    let response = await fetch(`https://www.omdbapi.com/?t=${filmTitle}&apikey=${keys.movies_key}`);
    response = await response.json();
    await createDom(response);
    const {Title} = response;
    const youtubeData = await getDataYoutube(Title);
    await insertElementYoutube(youtubeData);
}

init().then().catch();


