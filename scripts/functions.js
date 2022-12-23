//FUNCTIONS
//Authors
let addNewAuthor = (firstName, middleName, lastName, birthDate) => {
    let author = {
        firstName,
        lastName,
        middleName,
        birthDate,
        books: [],
        chosenFlag: false,
    }
    clearNewAuthorFormErrors();
    if (firstName !== '' && lastName !== '' && firstName[0] !== ' ' && lastName[0] !== ' ' && validateDate(birthDate)) {
        authors.push(author);
        updateAuthorsData();
        clearNewAuthorForm();
    } else {
        if (firstName === '' || firstName[0] === ' ') {
            newAuthorEmptyFirstNameErrorOutput.textContent = "Обов'язкове поле";
        }
        if (lastName === '' || lastName[0] === ' ') {
            newAuthorEmptyLastNameErrorOutput.textContent = "Обов'язкове поле";
        }
        if (!validateDate(birthDate)) {
            newAuthorDateErrorOutput.textContent = "Некоректно задана дата";
        }
    }
}
let clearNewAuthorFormErrors = () => {
    newAuthorEmptyFirstNameErrorOutput.textContent = "";
    newAuthorEmptyLastNameErrorOutput.textContent = "";
    newAuthorDateErrorOutput.textContent = "";
}
let clearNewAuthorForm = () => {
    firstNameInput.value = '';
    middleNameInput.value = '';
    lastNameInput.value = '';
    birthDateInput.value = '';
    clearNewAuthorFormErrors();
}
let updateAuthorsTable = () => {
    authorsTable.innerHTML = "";
    let authorId;
    let index = 0;
    let tableHeader = document.createElement('tr');
    let authorsCell = document.createElement('th');
    authorsCell.textContent = 'Автори';
    authorsCell.addEventListener('click', () => {
        sortAuthorsByLastName();
    });
    let bookAmountCell = document.createElement('th');
    bookAmountCell.textContent = 'Кількість книг';
    bookAmountCell.addEventListener('click', () => {
        sortAuthorsByBooksNumber();
    })
    tableHeader.append(authorsCell);
    tableHeader.append(bookAmountCell);
    authorsTable.append(tableHeader);
    for (const author of authors) {
        let newRow = document.createElement('tr');
        let name = document.createElement('td');
        let booksAmount = document.createElement('td');
        let editCell = document.createElement('td');
        let deleteCell = document.createElement('td');
        let detailsCell = document.createElement('td');

        let editLink = document.createElement('a');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        let detailsLink = document.createElement('a');
        let detailsBtn = document.createElement('button');

        editLink.href = 'editAuthor.html';
        editBtn.dataset.authorId = `${index}`;
        editBtn.textContent = 'Редагувати';
        deleteBtn.dataset.authorId = `${index}`;
        deleteBtn.textContent = 'Видалити';
        detailsLink.href = 'authorDetails.html';
        detailsBtn.dataset.authorId = `${index}`;
        detailsBtn.textContent = 'Деталі';
        booksAmount.textContent = `${author.books.length}`;

        editLink.append(editBtn);
        detailsLink.append(detailsBtn);
        editCell.append(editLink);
        deleteCell.append(deleteBtn);
        detailsCell.append(detailsLink);

        editLink.addEventListener('click', (e) => {
            for (const author1 of authors) {
                author1.chosenFlag = false;
            }
            authorId = parseInt(e.srcElement.dataset.authorId);
            authors[authorId].chosenFlag = true;
            updateAuthorsData();
        });
        deleteBtn.addEventListener('click', (e) => deleteAuthor(parseInt(e.srcElement.dataset.authorId)));
        detailsLink.addEventListener('click', (e) => {
            for (const author1 of authors) {
                author1.chosenFlag = false;
            }
            authorId = parseInt(e.srcElement.dataset.authorId);
            authors[authorId].chosenFlag = true;
            updateAuthorsData();
        })

        if (author.middleName) name.textContent = `${author.lastName} ${author.firstName[0]}. ${author.middleName[0]}.`;
        else name.textContent = `${author.lastName} ${author.firstName[0]}.`;

        newRow.append(name);
        newRow.append(booksAmount);
        newRow.append(editCell);
        newRow.append(deleteCell);
        newRow.append(detailsCell);
        authorsTable.append(newRow);
        index++;
    }
    updateAuthorsData();
}
let editedAuthorId;
let displayAuthorEditor = () => {
    newBookBtn.disabled = false;
    setMaxDate(editedBirthDateInput);
    for (const author of authors) {
        if (author.chosenFlag) {
            editedFirstNameInput.value = author.firstName;
            editedLastNameInput.value = author.lastName;
            editedMiddleNameInput.value = author.middleName;
            editedBirthDateInput.value = author.birthDate;
            editedAuthorId = authors.indexOf(author);
            editAuthorBooksTable.innerHTML = '';
            let bookIndex = 0;
            let bookNameInputs = [];
            let genreSelectors = [];
            let pagesNumberInputs = [];
            let editButtons = [];
            let bookRows = [];
            for (const book of author.books) {
                let bookRow = document.createElement('tr');
                let inputsCell = document.createElement('td');
                let bookName = document.createElement('input');
                let buttonsCell = document.createElement('td');
                let editBtn = document.createElement('button');
                let deleteBtn = document.createElement('button');
                let genreSelector = document.createElement('select');
                let pagesNumberInput = document.createElement('input');
                bookName.disabled = true;
                bookName.value = book.name;
                bookName.type = 'text';
                bookName.id = 'editBookNameInput';
                editBtn.textContent = 'Редагувати';
                editBtn.dataset.bookId = `${bookIndex}`;
                editBtn.classList.add('editBtn');
                bookRow.classList.add('notChosen');
                let name = document.createElement('p');
                name.textContent = `${book.name}`;
                let genreAndPages = document.createElement('p');
                genreAndPages.textContent = `${book.genre} ${book.pagesNumber} ст.`;
                inputsCell.append(name);
                inputsCell.append(genreAndPages);
                deleteBtn.textContent = 'Видалити';
                deleteBtn.dataset.bookId = `${bookIndex}`;
                pagesNumberInput.type = 'number';
                pagesNumberInput.id = 'editBookPagesNumberInput';
                genreSelector.id = 'editBookGenreSelector';
                deleteBtn.addEventListener('click', (e) => {
                    deleteBook(author, e.srcElement.dataset.bookId);
                });
                editBtn.addEventListener('click', (e) => {
                    let index = e.srcElement.dataset.bookId;
                    let book = author.books[index];
                    book.chosenFlag = !book.chosenFlag;
                    if (book.chosenFlag) {
                        e.preventDefault();
                        inputsCell.innerHTML = '';
                        bookNameInputs[index].disabled = false;
                        pagesNumberInputs[index].value = book.pagesNumber;
                        pagesNumberInputs[index].disabled = false;
                        bookRows[index].classList.remove('notChosen');
                        for (const genre of genres) {
                            let option = document.createElement('option');
                            option.textContent = genre.name;
                            genreSelectors[index].append(option);
                            if (book.genre === genre.name) option.selected = true;
                        }
                        for (const button of editButtons) {
                            if (editButtons.indexOf(button) != index) button.disabled = true;
                        }
                        newBookBtn.disabled = true;
                        inputsCell.append(bookName);
                        inputsCell.append(genreSelectors[index]);
                        inputsCell.append(pagesNumberInputs[index]);
                    } else {
                        book.name = bookNameInputs[index].value;
                        book.genre = genreSelector.value;
                        book.pagesNumber = pagesNumberInputs[index].value;
                        newBookBtn.disabled = false;
                        updateAuthorsData();
                        displayAuthorEditor();
                    }
                })
                buttonsCell.append(editBtn);
                buttonsCell.append(deleteBtn);
                bookRow.append(inputsCell);
                bookRow.append(buttonsCell);

                editAuthorBooksTable.append(bookRow);
                bookNameInputs.push(bookName);
                genreSelectors.push(genreSelector);
                pagesNumberInputs.push(pagesNumberInput);
                editButtons.push(editBtn);
                bookRows.push(bookRow);
                bookIndex++;
            }
            clearEditAuthorFormErrors();
            break;
        }
    }
}
let clearEditAuthorFormErrors = () => {
    editAuthorEmptyFirstNameErrorOutput.textContent = "";
    editAuthorEmptyLastNameErrorOutput.textContent = "";
    editAuthorDateErrorOutput.textContent = "";
}
let editAuthor = () => {
    if (editedFirstNameInput.value !== '' && editedLastNameInput.value !== '' && editedFirstNameInput.value[0] !== " " && editedLastNameInput.value[0] !== " " && validateDate(editedBirthDateInput.value)) {
        authors[editedAuthorId].firstName = editedFirstNameInput.value;
        authors[editedAuthorId].lastName = editedLastNameInput.value;
        authors[editedAuthorId].middleName = editedMiddleNameInput.value;
        authors[editedAuthorId].birthDate = editedBirthDateInput.value;
        updateAuthorsData();
        displayAuthorEditor();
    } else {
        clearEditAuthorFormErrors();
        if (editedFirstNameInput.value === '' || editedFirstNameInput.value[0] === " ") editAuthorEmptyFirstNameErrorOutput.textContent = "Обов'язкове поле";
        if (editedLastNameInput.value === '' || editedLastNameInput.value[0] === " ") editAuthorEmptyLastNameErrorOutput.textContent = "Обов'язкове поле";
        if (!validateDate(editedBirthDateInput.value)) editAuthorDateErrorOutput.textContent = "Некоректно задана дата";
    }
}
let addNewBookFlag = false;
let addNewBook = () => {
    if (document.querySelector('.editBtn')) {
        for (const button of document.querySelectorAll('.editBtn')) {
            button.disabled = true;
        }
    }
    let currentAuthor;
    for (const author of authors) {
        if (author.chosenFlag) {
            currentAuthor = author;
            break;
        }
    }
    let pushNewBook = (name, pagesNumber, genre) => {
        let book = {
            name,
            pagesNumber,
            genre,
            chosenFlag: false,
        }
        if (name !== '' && pagesNumber !== '' && genre !== '') {
            currentAuthor.books.push(book);
            updateAuthorsData();
            displayAuthorEditor();
            addNewBookFlag = false;
        }
    }
    if (!addNewBookFlag) {
        let newBookRow = document.createElement('tr');
        let inputsCell = document.createElement('td');
        let newBookNameInput = document.createElement('input');
        let newBookGenreSelector = document.createElement('select');
        let newBookPagesNumberInput = document.createElement('input');
        newBookNameInput.type = 'text';
        newBookNameInput.id = 'newBookNameInput';
        newBookNameInput.placeholder = 'Назва книги';
        inputsCell.append(newBookNameInput);
        newBookRow.append(inputsCell);
        newBookRow.id = 'newBookRow';
        newBookPagesNumberInput.type = 'number';
        newBookPagesNumberInput.id = 'newBookPagesNumberInput';
        newBookPagesNumberInput.placeholder = 'ст.';
        for (const genre of genres) {
            let option = document.createElement('option');
            option.textContent = genre.name;
            newBookGenreSelector.append(option);
        }
        newBookGenreSelector.id = 'newBookGenreSelector';
        inputsCell.append(newBookGenreSelector);
        inputsCell.append(newBookPagesNumberInput);
        newBookRow.append(inputsCell);
        editAuthorBooksTable.append(newBookRow);
        addNewBookFlag = true;
    } else {
        pushNewBook(document.querySelector('#newBookNameInput').value, document.querySelector('#newBookPagesNumberInput').value, document.querySelector('#newBookGenreSelector').value);
    }
}
let deleteBook = (author, bookId) => {
    author.books.splice(bookId, 1);
    updateAuthorsData();
    displayAuthorEditor();
}
let deleteAuthor = (id) => {
    authors.splice(id, 1);
    updateAuthorsData();
    updateAuthorsTable();
}
//Author-Details
let updateDetailsTable = () => {
    for (const author of authors) {
        if (author.chosenFlag) {
            detailsFirstNameOutput.value = author.firstName;
            detailsLastNameOutput.value = author.lastName;
            detailsMiddleNameOutput.value = author.middleName;
            detailsBirthDateOutput.value = author.birthDate;
            authorDetailsBooksTable.innerHTML = '';
            for (const book of author.books) {
                let bookRow = document.createElement('tr');
                let bookCell = document.createElement('td');
                let bookName = document.createElement('p');
                let genreAndPages = document.createElement('p');
                bookName.disabled = true;
                bookName.textContent = book.name;
                genreAndPages.textContent = `${book.genre} ${book.pagesNumber} ст.`;
                bookCell.append(bookName);
                bookCell.append(genreAndPages);
                bookRow.append(bookCell);

                authorDetailsBooksTable.append(bookRow);
            }
            break;
        }
    }
}
//Genres
let updateGenresTable = () => {
    genresTable.innerHTML = "";
    let index = 0;
    let tableHeader = document.createElement('tr');
    let genreNameCell = document.createElement('th');
    genreNameCell.textContent = 'Назва жанру';
    tableHeader.append(genreNameCell);
    genresTable.append(tableHeader);
    let genreNameInputs = [];
    let genreId;
    for (const genre of genres) {
        genre.chosenFlag = false;

        let newRow = document.createElement('tr');
        let nameCell = document.createElement('td');
        let editCell = document.createElement('td');
        let deleteCell = document.createElement('td');

        let nameInput = document.createElement('input');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        nameInput.type = 'text';
        nameInput.value = genre.name;
        nameInput.disabled = true;
        genreNameInputs.push(nameInput);
        editBtn.dataset.genreId = `${index}`;
        editBtn.textContent = 'Редагувати';
        deleteBtn.dataset.genreId = `${index}`;
        deleteBtn.textContent = 'Видалити';

        nameCell.append(nameInput);
        editCell.append(editBtn);
        deleteCell.append(deleteBtn);

        editBtn.addEventListener('click', (e) => {
            genreId = parseInt(e.srcElement.dataset.genreId);
            editGenre(e, genreNameInputs, genreId);
        });
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                editGenre(e, genreNameInputs, genreId);
            }
        });
        deleteBtn.addEventListener('click', (e) => deleteGenre(parseInt(e.srcElement.dataset.genreId)));

        newRow.append(nameCell);
        newRow.append(editCell);
        newRow.append(deleteCell);
        genresTable.append(newRow);
        index++;
    }
    updateGenresData();
}
let deleteGenre = (id) => {
    genres.splice(id, 1);
    updateGenresData();
    updateGenresTable();
}
let editGenre = (e, inputs, genreId) => {
    let chosenFlag = genres[genreId].chosenFlag = !genres[genreId].chosenFlag;
    let input = inputs[genreId];
    if (e.key !== 'Enter') {
        if (chosenFlag) {
            input.disabled = false;
        } else {
            if (input.value !== '' && input.value[0] !== ' ') {
                input.disabled = true;
                genres[genreId].name = input.value;
                updateGenresData();
            }
        }
    } else {
        if (!chosenFlag) {
            if (input.value !== '' && input.value[0] !== ' ') {
                input.disabled = true;
                genres[genreId].name = input.value;
                updateGenresData();
            }
        }
    }
}
let addNewGenreFlag = false;
let addNewGenre = () => {
    let pushNewGenre = (value) => {
        let genre = {
            name: value,
            chosenFlag: false,
        }
        if (value !== '' && value[0] !== ' ') {
            genres.push(genre);
            updateGenresData();
            updateGenresTable();
            addNewGenreFlag = false;
        }
    }
    if (!addNewGenreFlag) {
        let newGenreRow = document.createElement('tr');
        let newGenreNameCell = document.createElement('td');
        let newGenreNameInput = document.createElement('input');
        newGenreNameInput.type = 'text';
        newGenreNameInput.id = 'newGenreInput';
        newGenreNameInput.placeholder = 'Назва жанру';
        newGenreNameCell.append(newGenreNameInput);
        newGenreRow.append(newGenreNameCell);
        genresTable.append(newGenreRow);
        newGenreNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                pushNewGenre(newGenreNameInput.value);
            }
        });
        addNewGenreFlag = true;
    } else {
        if (document.querySelector('#newGenreInput')) {
            pushNewGenre(document.querySelector('#newGenreInput').value);
        } else {
            addNewGenreFlag = false;
            addNewGenre();
        }
    }
}
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
//VALIDATION
let getCurrentDate = () => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    return `${currentYear}-${currentMonth}-${currentDay}`;
}
let setMaxDate = (dateInput) => {
    dateInput.max = getCurrentDate();
}
let validCharacters = (dateToCheck) => {
    let regex = new RegExp('[0-9.]');
    return regex.test(dateToCheck);
}
let validateDate = (date) => {
    return date <= getCurrentDate() && validCharacters(date);
}
//SORT
let sortAuthorsByLastName = () => {
    let authorLastNames = [];
    for (const author of authors) {
        authorLastNames.push(author.lastName.toLowerCase());
    }
    authorLastNames.sort();
    let newAuthorsArrayByName = [];
    for (const authorName of authorLastNames) {
        for (const author of authors) {
            if (author.lastName.toLowerCase() === authorName) {
                if (!newAuthorsArrayByName.includes(author)) {
                    newAuthorsArrayByName.push(author);
                }
            }
        }
    }
    authors = newAuthorsArrayByName;
    updateAuthorsData();
    updateAuthorsTable();
}
let sortAuthorsByBooksNumber = () => {
    let authorBooksNumbers = [];
    for (const author of authors) {
        authorBooksNumbers.push(author.books.length);
    }
    let compareNumbers = (a, b) => {
        return a - b;
    }
    authorBooksNumbers.sort(compareNumbers);
    let newAuthorsArrayByNumber = [];
    for (const authorBooksNumber of authorBooksNumbers) {
        for (const author of authors) {
            if (author.books.length === authorBooksNumber) {
                if (!newAuthorsArrayByNumber.includes(author)) {
                    newAuthorsArrayByNumber.push(author);
                }
            }
        }
    }
    authors = newAuthorsArrayByNumber;
    updateAuthorsData();
    updateAuthorsTable();
}