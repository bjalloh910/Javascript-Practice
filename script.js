const myLibrary = [];

function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
    this.info = function info(){
        console.log(this.title, "by", this.author, this.numOfPages,"of pages", this.read)
    };
}
const Hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
Hobbit.info()


function addBookToLibrary(title, author, numOfPages, read) {
    // create a book from the arguments
    const newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);

    myLibrary.forEach(book => book.info());
}

addBookToLibrary("1984", "George Orwell", 328, "read");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "not read yet");


// Add a “New Book” button that brings up a form allowing users to input the details for the new book and add it to the library.
document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.getElementById('openPopUp');
    const popupForm = document.getElementById('popupForm');
    const closePopupButton = document.getElementById('closePopup');
    const bookForm = document.getElementById('bookForm');


    // show the popup when the button is clicked
    openPopupButton.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    })

    // Hide the popup when the close button is clicked
    closePopupButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
    })

    // Hide the popup when clicking outside of the popup content
    popupForm.addEventListener('click', (event) => {
        if (event.target == popupForm) {
            popupForm.style.display = 'none';
        }
    })

    // Now you need to handle the submission from the form

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault(); // this is to stop the page from reloading

        // get the values from the form
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const numOfPages = document.getElementById('numofpages').value;
        const read = document.getElementById('read').value;

        console.log(`Captured data: ${title}, ${author}, ${numOfPages}, ${read}`); 

        addBookToLibrary(title, author, numOfPages, read)

        console.log(myLibrary)

        console.log("Updated books array:", myLibrary);

        bookForm.reset();
        popupForm.style.display = 'none';

        showLibrary();

    })

    function showLibrary(){
        const libraryContainer = document.getElementById('libraryContainer');
       
        libraryContainer.innerHTML = '';

        myLibrary.forEach((book, index) => {
            
            
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.numOfPages}</p>
            <p>Read: ${book.read}</p>
            <button class="remove-book" data-index="${index}">Remove</button>
            <button class="statusbtn"  data-index="${index}">Status</button>
        `;

        libraryContainer.appendChild(bookDiv);
        });

        // function to add functionality to the remove button
        document.querySelectorAll('.remove-book').forEach(button => { // selects all the elements with the class name and iterates over them
            button.addEventListener('click', (event) => { // add event listen to each button
                const index = event.target.getAttribute('data-index'); //When a button is clicked, retrieves the value of the data-index attribute from the clicked button.
                removeBookFromLibrary(index); // call the function to remove that specfic index
            });
        })

        // function to add functionality to the status button
        document.querySelectorAll('.statusbtn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                changeStatus(index);
            })
        })

    }
    // function to remove book
    function removeBookFromLibrary(index) {
        myLibrary.splice(index, 1); // Remove the book at the specified index
        showLibrary(); // Re-render the library
    }    
    // function to change status
    function changeStatus(index) {
        const book = myLibrary[index];
        book.read = book.read === 'read' ? 'not read yet' : 'read';
        showLibrary(); // Re-render the library to reflect the status change
    }
})

