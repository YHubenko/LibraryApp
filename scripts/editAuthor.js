//EDIT-AUTHOR
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


let editAuthorBooksTable = document.querySelector('#editAuthorBooksTable');
let editedFirstNameInput = document.querySelector('#editedFirstNameInput');
let editedLastNameInput = document.querySelector('#editedLastNameInput');
let editedMiddleNameInput = document.querySelector('#editedMiddleNameInput');
let editedBirthDateInput = document.querySelector('#editedBirthDateInput');
let newBookBtn = document.querySelector('#newBookBtn');
let submitBtn = document.querySelector('#submitBtn');
let editAuthorEmptyFirstNameErrorOutput = document.querySelector('#editAuthorEmptyFirstNameErrorOutput');
let editAuthorEmptyLastNameErrorOutput = document.querySelector('#editAuthorEmptyLastNameErrorOutput');
let editAuthorDateErrorOutput = document.querySelector('#editAuthorDateErrorOutput');

window.onload = displayAuthorEditor;
newBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addNewBook();
});
submitBtn.addEventListener('click', () => {
    editAuthor();
    addNewBookFlag = false;
});