const imdbURI = 'https://www.imdb.com/title/';

const allMovies = database.Movies;

const filterByHero = (hero) => {
    const moviesByHero = allMovies.filter((item) => {
        return item.Title.includes(hero);
    });
    return moviesByHero;
}

const filterByYear = (year) => {
    const moviesByYear = allMovies.filter((item) => {
        return item.Year >= year;
    });
    return moviesByYear;
}

const returnFilterdMovies = () => {
    const button = document.querySelectorAll('input[name=filter]');
    button.forEach((element) => {
        element.addEventListener('click',(event) => {
            const resultSelected = event.target.value;
            if(parseInt(resultSelected)) {
                const filterdMovies = filterByYear(resultSelected);
                displayMovies(filterdMovies);
            } else {
                const filterdMovies = filterByHero(resultSelected);
                displayMovies(filterdMovies);
            }
        }) 
    });
}

const displayMovies = (array) => {
    const contentBody = document.querySelector('#content');
    while(contentBody.firstChild) {
        contentBody.removeChild(contentBody.firstChild);
    }
    array.forEach((item) => {
        const movieWrapper = document.createElement('div');
        movieWrapper.classList.add('movie-wrapper');
        const movieLink = `<a href="${imdbURI+item.imdbID}" target="_blank"><img src="${item.Poster}" alt="${item.Title}"></a>`;
        movieWrapper.innerHTML = movieLink;
        contentBody.append(movieWrapper);
    });
}

displayMovies(allMovies);
returnFilterdMovies();