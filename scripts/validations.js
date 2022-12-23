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