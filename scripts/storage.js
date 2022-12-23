//STORAGE
let authors = [];
let genres = [];

//Methods
let updateAuthorsData = () => {
    localStorage.setItem('practise-task-authors', JSON.stringify(authors));
}
let getAuthorsData = () => {
    authors = JSON.parse(localStorage.getItem('practise-task-authors'));
}
let updateGenresData = () => {
    localStorage.setItem('practise-task-genres', JSON.stringify(genres));
}
let getGenresData = () => {
    genres = JSON.parse(localStorage.getItem('practise-task-genres'));
}

//FillStorage
if (!localStorage.getItem('practise-task-authors')) {
    authors = [
        {
            firstName: "Тарас",
            lastName: "Шевченко",
            middleName: "Григорович",
            birthDate: "1814-03-09",
            books: [
                {
                    name: 'Кобзар',
                    pagesNumber: '115',
                    genre: 'Поезія',
                    chosenFlag: false,
                },
            ],
            chosenFlag: false,
        },
        {
            firstName: "Вільям",
            lastName: "Шекспір",
            middleName: "",
            birthDate: "1814-03-09",
            books: [
                {
                    name: 'Король Лір',
                    pagesNumber: '240',
                    genre: 'Драма',
                    chosenFlag: false,
                },
                {
                    name: 'Гамлет',
                    pagesNumber: '238',
                    genre: 'Драма',
                    chosenFlag: false,
                }
            ],
            chosenFlag: false,
        }
    ];
    updateAuthorsData();
} else {
    getAuthorsData();
}
if (!localStorage.getItem('practise-task-genres')) {
    genres = [
        {
            name: 'Поезія',
            chosenFlag: false,
        },
        {
            name: 'Проза',
            chosenFlag: false,
        },
        {
            name: 'Драма',
            chosenFlag: false,
        }
    ];
    updateGenresData();
} else {
    getGenresData();
}