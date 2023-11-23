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

submitBookBtn.addEventListener('click', getBook);

function Book(title, author, pages, read){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function getBook(){

    if(book) book = {};

    let titleInput = document.querySelector('.get-title');
    let authorInput = document.querySelector('.get-author');
    let pagesInput = document.querySelector('.get-pages')
    let readBoolInput = document.querySelector('#get-read');

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let readBool = readBoolInput.checked;

    let book = new Book(title, author, pages, readBool)
    console.log(book)
    return book;

}

function postBook(){

        

}