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