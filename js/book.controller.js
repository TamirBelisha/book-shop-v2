'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = `<table> 
    <thead>
        <tr>
            <th data-trans="id-title" onclick="onSetSortBy('ID')">ID</th>
            <th data-trans="title-title" onclick="onSetSortBy('TITLE')">TITLE</th>
            <th data-trans="price-title" onclick="onSetSortBy('PRICE')">PRICE</th>
            <th data-trans="rate-title" onclick="onSetSortBy('RATE')">RATE</th>
            <th data-trans="actions-title">ACTIONS</th>
        </tr>
    </thead>
    <tbody>`;
    var htmlsArr = books.map((book) => {
        var id = book.id
        return `<tr>
                    <td>${id}</td>
                    <td>${book.name}</td>
                    <td>${formatCurrency(book.price)}</td>
                    <td>${book.rate}</td>
                    <td>
                    <button class="action read" data-trans="read-btn" onclick="onReadBook(${id})">Read</button> 
                    <button class="action update" data-trans="update-btn" onclick="onUpdateBook (${id})">Update</button> 
                    <button class="action delete" data-trans="delete-btn" onclick="onRemoveBook(${id})">Delete</button>
                    </td>
                </tr>
        `
    })
    strHtmls += htmlsArr.join('');
    strHtmls += `</tbody></table>`


    document.querySelector('.books-container').innerHTML = strHtmls;
    doTrans();

}

function onSetSortBy(sortBy) {

    setBookSort(sortBy);
    renderBooks();
}

function onUpdateBook(bookId) {
    const price = prompt('New price please?')
    if (!price) return;
    updateBook(bookId, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    if (!confirm('Are you sure?')) return;
    removeBook(bookId);
    renderBooks();
}

function onReadBook(bookId) {
    const book = getBookById(bookId)
    const elModal = document.querySelector('.modall')
    elModal.querySelector('h2').innerText = book.name;
    elModal.querySelector('.span-rate').innerHTML = `
    <button class="rate-buttons" onclick="onRateClick(-1, ${bookId})">-</button>
    <input type="number" value="${book.rate}" class="rate-input"/>
    <button class="rate-buttons" onclick="onRateClick(+1, ${bookId})">+</button>
    `
    elModal.querySelector('.span-price').innerText = book.price;
    elModal.querySelector('p').innerText = makeLorem();
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modall').classList.remove('open');
}

function onRateClick(num, bookId) {
    var book = getBookById(bookId)
    rateBook(num, bookId);
    renderBooks();
}


function onAddBook() {
    const elName = document.querySelector('input[name=add-name]')
    const name = elName.value.trim()
    if (!name) return;
    const elPrice = document.querySelector('input[name=add-price]')
    const price = elPrice.value.trim()
    if (!price) return;
    addBook(name, price);
    renderBooks();
    elName.value = '';
    elPrice.value = '';
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}