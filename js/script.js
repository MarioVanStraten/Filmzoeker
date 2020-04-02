//// Database handler
const allMovies = database.Movies;

const retrieveFromDB = (value, source) => {
    // If value is a number -> filter by year
    if(parseInt(value)){
        if(source === 'button'){
            // If source is button -> filter by greater then or equal to button value
            const result = allMovies.filter((item) => item.Year >= value);
            return result;
        } else {
            // If source is search -> filter by given value
            const result = allMovies.filter((item) => item.Year.includes(value));
            return result;
        }
    } else {
        // If value is a string -> filter by movie title (case unsensitive)
        const result = allMovies.filter((item) => item.Title.toLowerCase().includes(value.toLowerCase()));
        return result;
    }
}

//// Render handler
const displayMovies = (array) => {
    const contentBody = document.querySelector('#content');
    // Clear current content
    while(contentBody.firstChild) {
        contentBody.removeChild(contentBody.firstChild);
    }
    // Check if results are found
    if(array.length > 0){
        // Display new content
        array.forEach((item) => {
            const movieWrapper = document.createElement('div');
            movieWrapper.classList.add('movie-wrapper');
            const movieLink = `<a href="https://www.imdb.com/title/${item.imdbID}" target="_blank"><img src="${item.Poster}" alt="${item.Title}"></a>`;
            movieWrapper.innerHTML = movieLink;
            contentBody.append(movieWrapper);
        });
    } else {
        // Display message when no results are found
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message');
        const message = '<p>Geen resultaten gevonden</p>';
        messageWrapper.innerHTML = message;
        contentBody.append(messageWrapper);
    }
}

//// User input handler
const handleUserInput = () => {
    // Button input (radio group)
    const button = document.querySelectorAll('input[name=filter]');
    button.forEach((element) => {
        element.addEventListener('click',(event) => {
            const valueSelected = event.target.value;
            const filterdMovies = retrieveFromDB(valueSelected,'button');
            displayMovies(filterdMovies);
            // Reset filter (diplay all movies)
            if(valueSelected === 'reset'){displayMovies(allMovies);}
            // Empty searchfield when button is clicked
            searchField.value = '';
        });
    });
    // Searchfield input (search while type)
    const searchField = document.querySelector('input[name=search]');
    searchField.addEventListener('input',(event) => {
        const searchValue = event.target.value;
        const filterdMovies = retrieveFromDB(searchValue,'search');
        displayMovies(filterdMovies);
        // Reset menu buttons when search is used
        button.forEach((element) => element.checked = false);
    });
}

// Display movies on initial load
displayMovies(allMovies);
// Initiate user input handler
handleUserInput();