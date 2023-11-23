const openDialogBtn = document.querySelector('.add-book');
const addDialog = document.querySelector('.add-dialog');

openDialogBtn.addEventListener('click', showAddBook)

function showAddBook(){

    addDialog.showModal();

};

const submitBookBtn = document.querySelector('submit-book');

submitBookBtn.addEventListener('click', postBook);

function postBook(){

    let bookTitle = document.querySelector('.get-title');
    let author = document.querySelector('.get-author');
    let pages = document.querySelector('.get-pages')
    let readBool = document.querySelector('#get-read');

    

}
