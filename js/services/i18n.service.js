'use strict';

var gTrans = {
    title: {
        en: 'Book shop',
        he: 'חנות ספרים'
    },
    'header-1': {
        en: 'Book shop',
        he: 'חנות ספרים'
    },
    'header-2': {
        en: 'Manage your books here',
        he: 'נהל את הספרים שלך בקלות'
    },
    'input-name': {
        en: 'Name of the book?',
        he: 'שם הספר?'
    },
    'input-price': {
        en: 'Price of the book?',
        he: 'מחיר הספר?'
    },
    'add-book-btn': {
        en: 'Add book',
        he: 'הוסף ספר'
    },
    'modal-header': {
        en: '',
        he: ''
    },
    'modal-rate': {
        en: 'Rate : ',
        he: 'דירוג : '
    },
    'modal-price': {
        en: 'Price : ',
        he: 'מחיר : '
    },
    'modal-desc': {
        en: 'Book description',
        he: 'תיאור הספר : '
    },
    'modal-close-btn': {
        en: 'Close',
        he: 'סגור'
    },
    'id-title': {
        en: 'ID',
        he: 'ID'
    },
    'title-title': {
        en: 'TITLE',
        he: 'שם הספר'
    },
    'price-title': {
        en: 'PRICE',
        he: 'מחיר'
    },
    'rate-title': {
        en: 'RATE',
        he: 'דירוג'
    },
    'actions-title': {
        en: 'ACTIONS',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    }
}

var gCurrLang = 'en';
var gCurrency = {
    en: 'USD',
    he: 'ILS'
}

function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: gCurrency[gCurrLang] }).format(num);
}