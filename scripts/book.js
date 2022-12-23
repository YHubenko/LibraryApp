let bookDetailsTable = document.querySelector('#bookDetailsTable');
let bookNameInput = document.querySelector('#bookNameInput');
let bookNameOutput = document.querySelector('#bookNameOutput');
let bookGenreOutput = document.querySelector('#bookGenreOutput');
let bookAuthorOutput = document.querySelector('#bookAuthorOutput');
let bookPagesNumberOutput = document.querySelector('#bookPagesNumberOutput');

let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', () => {
    findBook();
});
bookNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') findBook();
})