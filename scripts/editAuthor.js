//EDIT-AUTHOR
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