const openDialogBtn = document.querySelector('.add-book');
const dialog = document.querySelector('.dialog');

openDialogBtn.addEventListener('click', showAddBook)

function showAddBook(){

    dialog.showModal();

};

const closeDialogX = document.querySelector('.close-dialog');

closeDialogX.addEventListener('click', closeDialog);

function closeDialog(){

    dialog.close();

}

const submitBookBtn = document.querySelector('.submit-book');

submitBookBtn.addEventListener('click', addBook);

let addBookForm = document.querySelector('.modal-form');

function Book(title, author, pages, read){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

const myLibrary = [];

const cardsDiv = document.querySelector('.cards-div');

function checkRequired(){

    if(!titleInput.value || !authorInput.value || !pagesInput){ 
        alert("Title, author and total pages are required")
        return false
    };
    return true
}

function addBook(){
    
    if(!checkRequired()) return;
    
    console.log(myLibrary)

    let book = getBook();

    let card = document.createElement('div');
    card.classList.add('card')
    let isBookRead = book.read === true ? "Read" : "Not read";

    if (isBookRead === "Read") {

        card.innerHTML = `<span class="title"><strong>"${book.title}"</strong></span>
    
        <span class="author">${book.author}</span>
    
        <span class="total-pages">${book.pages}</span>
    
        <button class="read-btn read">${isBookRead}</button>
    
        <button class="rmv-btn">Remove</button>`

    } else {

        card.innerHTML = `<span class="title"><strong>"${book.title}"</strong></span>

        <span class="author">${book.author}</span>

        <span class="total-pages">${book.pages}</span>

        <button class="read-btn not-read">${isBookRead}</button>

        <button class="rmv-btn">Remove</button>`

    }

    cardsDiv.appendChild(card);

    readBtns = document.querySelectorAll('.read-btn');
    readBtnsArray = Array.from(readBtns);

    readBtnsArray.forEach(btn => {
        btn.addEventListener('click', setReadState)
    });

    removeBtns = document.querySelectorAll('.rmv-btn');
    removeBtnArray = Array.from(removeBtns);

    removeBtnArray.forEach(btn => {
        btn.addEventListener('click', removeBook)
    })

}

function isBookUnique(title, author, pages){

    return myLibrary.every((book) => book.title !== title || book.author !== author || book.pages !== pages);

}

let titleInput = document.querySelector('.get-title');
let authorInput = document.querySelector('.get-author');
let pagesInput = document.querySelector('.get-pages')
let readBoolInput = document.querySelector('#get-read');

function getBook(){

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let readBool = readBoolInput.checked;

    let book = new Book(title, author, pages, readBool)

    if(isBookUnique(title, author, pages)){
        
        myLibrary.push(book)

        addBookForm.reset();
        dialog.close();
        readBoolInput.checked = false;

        console.log(book)
        console.log(myLibrary)
        return book

    } else {

        alert('Book already exists!');
        return null

    };

}

function setReadState(e){

    if(e.target.classList.contains('read')){

        e.target.classList.remove('read');
        e.target.classList.add('not-read');
        e.target.textContent = 'Not read'
        
        
    } else if(e.target.classList.contains('not-read')){
        
        e.target.classList.remove('not-read');
        e.target.classList.add('read');
        e.target.textContent = 'Read'
    }

    console.log(e.target.classList)

}

let removeBtns;
let removeBtnArray;

function removeBook(e){

    let removeBtn = e.target.parentNode
    // let parentCard = cardToRemove.parentNode;
    let gDaddyCardDiv = removeBtn.closest('.card')
    gDaddyCardDiv.remove()
    // grandParentNode.removeChild(cardToRemove);
    // console.log(grandParentNode.parentNode)

}