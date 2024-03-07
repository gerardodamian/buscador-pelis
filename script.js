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
function displayMovies(movies) {
    resultContainer.innerHTML = "";

    if (movies.length === 0) {
        resultContainer.innerHTML =
            '<span style="color: orange; font-size: 40px;">No se encontraron resultados para tu busqueda</span>';
        return;
    }

    movies.forEach((movie, index) => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.id = "movie" + index;

        let title = document.createElement("h3");
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
    function showMovieDetails(movie) {
        // Crear un elemento div para mostrar los detalles
        let detailsContainer = document.createElement("div");
        detailsContainer.textContent = `Si queres ver La Peli 🎞️, tenes que pagar 💵, Chinguenguencha!!!! 🤣🤣`;
        detailsContainer.classList.add("details-container");

        let movieDiv = document.getElementById("movie" + movies.indexOf(movie)); // Busca la tarjeta por su identificador único

        // Agregar el elemento de detalles encima de la tarjeta de la película
        movieDiv.insertAdjacentElement("afterend", detailsContainer);

        // Desaparecer el mensaje después de unos segundos
        setTimeout(() => {
            detailsContainer.style.display = "none";
        }, 6000); // Cambia el número de milisegundos (5000 ms = 5 segundos)
    }
}
