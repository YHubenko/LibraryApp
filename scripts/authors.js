//AUTHORS
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
let deleteAuthor = (id) => {
    authors.splice(id, 1);
    updateAuthorsData();
    updateAuthorsTable();
}

let authorsTable = document.querySelector('#authorsTable');
window.onload = updateAuthorsTable;
