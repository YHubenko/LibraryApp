//GENRES
let genresTable = document.querySelector('#genresTable');
window.onload = updateGenresTable;

let newGenreBtn = document.querySelector('#newGenreBtn');
newGenreBtn.addEventListener('click', () => {
    addNewGenre();
})