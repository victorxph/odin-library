class Card {

    constructor(title, author, pages, read){

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read === true ? true : false;
        
    }
    
    index;
    htmlElement;
    
    readBtn;// = document.querySelector(`#index${this.index} .read-btn`);
    removeBtn;// = document.querySelector(`#index${this.index} .rmv-btn`);
    parentDiv = document.querySelector('.cards-div');
    

    addListners(){
        
        this.readBtn.addEventListener('click', this.setReadState.bind(this))
        this.removeBtn.addEventListener('click', this.removeCard.bind(this))

    }   
    
    setHTML() {

        let cardHTML;

        if (this.read) {

            cardHTML = `<span class="title"><strong>"${this.title}"</strong></span>
    
            <span class="author">${this.author}</span>
        
            <span class="total-pages">${this.pages}</span>
        
            <button class="read-btn read">Read</button>
        
            <button class="rmv-btn">Remove</button>`;

            return cardHTML

        }

        cardHTML = `<span class="title"><strong>"${this.title}"</strong></span>

            <span class="author">${this.author}</span>

            <span class="total-pages">${this.pages}</span>

            <button class="read-btn not-read">Not read</button>

            <button class="rmv-btn">Remove</button>`

            return cardHTML

    }

    appendCard(){
        
        let newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.id = `index${this.index}`;
        newCard.innerHTML = this.setHTML();
        this.htmlElement = newCard
        this.parentDiv.appendChild(newCard);
        this.removeBtn = this.htmlElement.querySelector('.rmv-btn');
        this.readBtn = this.htmlElement.querySelector('.read-btn');
        
        this.addListners()
        
    }
    
    setReadState(){

        
        if(this.readBtn.classList.contains('not-read')){
            
            this.read = true;
            console.log(this)
            this.readBtn.classList.remove('not-read');
            this.readBtn.classList.add('read');
            this.readBtn.textContent = 'Read';

            return

        } else if(this.readBtn.classList.contains('read')){
        
        this.read = false;
        console.log(this)
        this.readBtn.classList.remove('read');
        this.readBtn.classList.add('not-read');
        this.readBtn.textContent = 'Not read'

        }
        
    }
    
    removeCard(){
        
        let card = this.removeBtn.closest('.card');
        card.remove()
        libModule.removeBook(this.index)

    }

}

let libModule = (function(){

    let addBookBtn = document.querySelector('.add-book');
    addBookBtn.addEventListener('click', openDialog);

    let dialog = document.querySelector('.dialog')

    function openDialog(){

        dialog.showModal()

    }

    let closeDialogBtn = document.querySelector('.close-dialog')
    closeDialogBtn.addEventListener('click', closeDialog)
    
    function closeDialog(){

        dialog.close()

    }

    let bookForm = document.querySelector('.modal-form')

    let titleInput = document.querySelector('.get-title');
    let authorInput = document.querySelector('.get-author');
    let pagesInput = document.querySelector('.get-pages');
    let readInput = document.querySelector('#get-read')

    let submitBookBtn = document.querySelector('.submit-book')
    submitBookBtn.addEventListener('click', submitBook)
    dialog.addEventListener('keydown', (e) => {
        
        if(e.key === 'Enter'){
            e.preventDefault();
            submitBook();
        }
        
    });

    let library = []; 

    function isBookUnique(title, author, pages){

        if(!library.every((book) => book.title !== title || book.author !== author || book.pages !== pages)){

            alert("Book already exists!")
            return false;

        };
    
        return true

    }

    function checkRequired(){

        if(!titleInput.value || !authorInput.value || !pagesInput){ 
            alert("Title, author and total pages are required!")
            return false
        };
        return true
    }
    
    let index = 0;

    function submitBook(){

        if(!checkRequired()) return;

        let book = new Card(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        if(!isBookUnique(book.title, book.author, book.pages)) return;
        book.index = index;
        library.push(book);
        bookForm.reset();
        closeDialog();
        render();

    }

    function removeBook(objIndex){

        library.splice(objIndex, 1)
        library.forEach((book, index) => {
            book.index = index;
        });
        index--
    }
    
    function render(){

        library[index].appendCard()
        index++

    }

    function showLibrary(){

        console.log(library)

    }

    return {

        isBookUnique: isBookUnique,
        showLibrary: showLibrary,
        removeBook: removeBook

    }

})();