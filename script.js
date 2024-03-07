document.getElementById("searchButton").addEventListener("click", searchMovies);

let api_key = "e8f80b46e4b446a7be0487390f07eed3";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w200";

let resultContainer = document.getElementById("results");

function searchMovies() {
    resultContainer.innerHTML =
        '<span style="color: orange; font-size: 40px;">Cargando....</span>';
    let searchInput = document.getElementById("searchInput").value;

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then((response) => response.json())
        .then((response) => displayMovies(response.results));
}
function displayMovies(movies, index) {
    resultContainer.innerHTML = "";

    if (movies.length === 0) {
        resultContainer.innerHTML =
            '<span style="color: orange; font-size: 40px;">No se encontraron resultados para tu busqueda</span>';
        return;
    }

    movies.forEach((movie) => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        let title = document.createElement("h2");
        title.textContent = movie.title;

        let releaseDate = document.createElement("p");
        releaseDate.textContent =
            "La fecha de lanzamiento fue: " + movie.release_date;

        let overview = document.createElement("p");
        overview.textContent = movie.overview;

        let posterPath = urlImg + movie.poster_path;
        let poster = document.createElement("img");
        poster.src = posterPath;

        let button = document.createElement("button");

        button.textContent = "Ver Pelicula 🎞️";
        button.id = "verButton" + index;
        button.addEventListener("click", () => showMovieDetails(movie));

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);
        movieDiv.appendChild(button);

        resultContainer.appendChild(movieDiv);
    });
}
