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
        
        // console.log(this.readBtn)
        // console.log(this.removeBtn)
        
        this.addListners()
        // debugger;
        
    }
    
    setReadState(){
        
        console.log(this.readBtn)
        
        if(this.readBtn.classList.contains('not-read')){
            
            this.readBtn.classList.remove('not-read')
            this.readBtn.classList.add('read')
            this.readBtn.textContent = 'Read'
            return
        }
        
        this.readBtn.classList.remove('read');
        this.readBtn.classList.add('not-read');
        this.readBtn.textContent = 'Not read'
        
    }
    
    removeCard(){
        
        let card = this.removeBtn.closest('.card');
        card.remove()

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

    let library = []; 

    function isBookUnique(title, author, pages){

        return library.every((book) => book.title !== title || book.author !== author || book.pages !== pages);
    
    }
    
    let index = 0;

    function submitBook(){

        let book = new Card(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        book.index = index;
        console.log(library);
        library.push(book);
        bookForm.reset();
        closeDialog();
        render();

    }
    
    function render(){

        library[index].appendCard()
        index++

    }

    return {

        isBookUnique: isBookUnique

    }

})();