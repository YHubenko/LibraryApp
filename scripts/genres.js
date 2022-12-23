//GENRES
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

let genresTable = document.querySelector('#genresTable');
window.onload = updateGenresTable;

let newGenreBtn = document.querySelector('#newGenreBtn');
newGenreBtn.addEventListener('click', () => {
    addNewGenre();
})