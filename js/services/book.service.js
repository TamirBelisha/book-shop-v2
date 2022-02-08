'use strict'

const STORAGE_KEY = 'bookDB'
const bookNames = ['Harry Potter', 'The great Gatsby', 'Moby Dick', 'Hamlet', 'The Da Vinci code']
var gBookId = 1;
var gBooks;
var gLastSort;
var gDesc = -1;

_createBooks();


function getBooks() {
    return gBooks;
}

function removeBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price));
    _saveBooksToStorage();
}

function updateBook(bookId, price) {
    var book = getBookById();
    book.price = price;
    _saveBooksToStorage();
}

function rateBook(num, bookId) {
    const elRateInput = document.querySelector('.rate-input');
    switch (num) {
        case 1:
            if (elRateInput.value >= 10) break;
            elRateInput.value++
                break;

        case -1:
            if (elRateInput.value <= 0) break;
            elRateInput.value--
                break;
    }
    var book = getBookById(bookId);
    book.rate = elRateInput.value;
    _saveBooksToStorage();
}

function setBookSort(sortBy) {
    if (gLastSort === sortBy) {
        gDesc = 1;
    }
    switch (sortBy) {
        case 'ID':
            console.log('heyID');
            gBooks.sort((b1, b2) => (b1.id - b2.id) * gDesc)
            break;
        case 'TITLE':
            console.log('gDesc', gDesc);
            if (gDesc === -1) {
                gBooks.sort((b1, b2) => (b1.name < b2.name) * gDesc)
                break;
            } else gBooks.sort((b1, b2) => (b1.name > b2.name) * -gDesc)
            break;
        case 'PRICE':
            console.log(gBooks);
            gBooks.sort((b1, b2) => (b1.price - b2.price) * gDesc)
            console.log(gBooks);
            break;
        case 'RATE':
            gBooks.sort((b1, b2) => (b1.rate - b2.rate) * gDesc)
            break;
        default:
            break;
    }
    gDesc = -1;
    gLastSort = (!gLastSort) ? sortBy : null;
}

function getBookById(bookId) {
    var book = gBooks.find((book) => book.id === bookId);
    return book;
}

function getBookIdxById(bookId) {
    var bookIdx = gBooks.findIndex((book) => book.id === bookId);
    return bookIdx;
}

function _createBook(name = 'timi', price = 15) {
    return {
        id: gBookId++,
        name,
        price,
        imgUrl: 5,
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 5; i++) {
            books.push(_createBook(bookNames[i], getRandomIntInclusive(10, 90)));
        }
    }
    gBooks = books;
    gBookId = gBooks[(gBooks.length - 1)].id + 1;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}