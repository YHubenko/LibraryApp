//NEW-AUTHORS
let firstNameInput = document.querySelector('#firstNameInput');
let middleNameInput = document.querySelector('#middleNameInput');
let lastNameInput = document.querySelector('#lastNameInput');
let birthDateInput = document.querySelector('#birthDateInput');

let newAuthorEmptyFirstNameErrorOutput = document.querySelector('#newAuthorEmptyFirstNameErrorOutput');
let newAuthorEmptyLastNameErrorOutput = document.querySelector('#newAuthorEmptyLastNameErrorOutput');
let newAuthorDateErrorOutput = document.querySelector('#newAuthorDateErrorOutput');

let newAuthorBtn = document.querySelector('#addNewAuthorButton');

newAuthorBtn.addEventListener('click', () => {
    addNewAuthor(firstNameInput.value, middleNameInput.value, lastNameInput.value, birthDateInput.value);
})
window.onload = setMaxDate(birthDateInput);
