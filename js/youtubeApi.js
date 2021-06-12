const getUrlYoutube = (title, key) => {
    title = title.replaceAll(' ', '%20');
    title = title.trim();
    return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}%20film&key=${key}`;
}

const getDataYoutube = (response) => {
    const {items} = response;
    return items[0].id;
}

export {
    getUrlYoutube,
    getDataYoutube
}