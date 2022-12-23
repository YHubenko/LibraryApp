//NEW-AUTHORS
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
