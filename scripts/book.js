//BOOK
let findBook = () => {
    let bookName = bookNameInput.value;
    for (const author of authors) {
        author.chosenFlag = false;
        for (const book of author.books) {
            if (book.name.toLowerCase() === bookName.toLowerCase()) {
                bookNameOutput.textContent = book.name;
                bookGenreOutput.textContent = book.genre;
                if (author.middleName) bookAuthorOutput.textContent = `${author.lastName} ${author.firstName[0]}. ${author.middleName[0]}.`;
                else bookAuthorOutput.textContent = `${author.lastName} ${author.firstName[0]}.`;
                bookAuthorOutput.addEventListener('click', () => {
                    author.chosenFlag = true;
                    updateAuthorsData();
                })
                bookPagesNumberOutput.textContent = book.pagesNumber;
                bookDetailsTable.classList.remove('hidden');
            }
        }
    }
    updateAuthorsData();
}

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