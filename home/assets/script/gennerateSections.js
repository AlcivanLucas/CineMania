const apiKey = '5d3740a5fc6dfa4e862bede23e6d4fdb'; // é bom que cada um colque sua chave, se não vcs vão estourar meu limite kkkk 
const idioma = 'pt-BR';
// busca os generos do tmbd e chama a  fetchMoviesByGenre para que cade filme seja logo colocado dentroo
// de sua respctiva categoria 

function fetchGenre() {
    const fetchGenreUrl = `http://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${idioma}`;

    fetch(fetchGenreUrl)
        .then(response => response.json())
        .then(data => {
            const categorySection = document.querySelector('.categories');
            data.genres.forEach(genre => {
                const category = createGenreSection(genre);
                categorySection.appendChild(category);
                console.log(genre)

                // Busca os filmes para cada gênero e os anexa à seção de filmes da categoria
                fetchMoviesByGenre(genre.id, category.querySelector('.movie-row'));
            });
        }).catch(error => console.error('Erro ao buscar gêneros', error));
}

// essa fynção busca o Json com os filmes desejados
function fetchMoviesByGenre(genreId, movieRow) {
    const fetchMoviesByGenreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR&sort_by=popularity.desc`;

    fetch(fetchMoviesByGenreUrl)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieRow.appendChild(movieCard);
                console.log(movie)
            });
        })
        .catch(error => console.error('Erro ao buscar filmes:', error));
}


// Essa fpnção cria os cards dos filmes 
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const title = document.createElement('span');
    title.textContent = movie.title;

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = movie.title;
    image.addEventListener('click', function() {
        // Redireciona para a página de detalhes do filme
        window.location.href = `../../detailsMovie/detailMovie.html?id=${movie.id}`;
    });

    card.appendChild(image); 
    card.appendChild(title);

    return card;
}


// é uma funçaõ que ouve quando a pagina é carrega para buscar as informações na API 
document.addEventListener('DOMContentLoaded', () => {
    fetchGenre();
});
























