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

let authorDetailsBooksTable = document.querySelector('#authorDetailsBooksTable');
let detailsLastNameOutput = document.querySelector('#detailsLastNameOutput');
let detailsFirstNameOutput = document.querySelector('#detailsFirstNameOutput');
let detailsMiddleNameOutput = document.querySelector('#detailsMiddleNameOutput');
let detailsBirthDateOutput = document.querySelector('#detailsBirthDateOutput');

window.onload = updateDetailsTable;