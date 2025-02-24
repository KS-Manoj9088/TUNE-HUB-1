// Fetch movie data from JSON
fetch('data/movies.json')
    .then(response => response.json())
    .then(movies => {
        const movieContainer = document.getElementById('movie-container');

        movies.forEach(movie => {
            const movieBox = document.createElement('div');
            movieBox.classList.add('movie-box');
            movieBox.onclick = () => {
                window.location.href = `movie.html?id=${movie.id}`;
            };

            movieBox.innerHTML = `
                <img src="images/${movie.image}" alt="${movie.name}">
                <span>${movie.name}</span>
            `;
            movieContainer.appendChild(movieBox);
        });
    })
    .catch(error => console.error('Error loading movie data:', error));

// Fetch songs for selected movie
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    fetch('data/movies.json')
        .then(response => response.json())
        .then(movies => {
            const movie = movies.find(m => m.id === movieId);
            if (movie) {
                document.getElementById('movie-name').textContent = movie.name;
                const songContainer = document.getElementById('song-container');
                
                movie.songs.forEach(song => {
                    const songItem = document.createElement('div');
                    songItem.classList.add('song-item');
                    songItem.innerHTML = `
                        <span>${song.title}</span>
                        <audio controls>
                            <source src="songs/${song.path}" type="audio/mp3">
                        </audio>
                        <button onclick="window.location.href='songs/${song.path}'">Download</button>
                    `;
                    songContainer.appendChild(songItem);
                });
            }
        });
}
