class Book {
    // Classes are meant to encapsulate functionality and data. Using a global variable defeats this purpose and breaks the idea of keeping your Book logic self-contained
    static myLibrary = []; //static keeps the library logically tied to the Book class, meaning it’s only accessible via the class

    constructor(title, author, numOfPages, read) {
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.read = read;
    }
    info() {
        console.log(this.title, this.author, this.numOfPages, this.read);
    }
    static addBookToLibrary(title, author, numOfPages, read) {
        // create a book from the arguments
        const newBook = new Book(title, author, numOfPages, read);
        Book.myLibrary.push(newBook); // myLibrary is static meaning it's a property of the class itself not just any instance meaning you have to use the className in order to access it.
    
        Book.myLibrary.forEach(book => book.info());
    }
    static theLibrary(){
        console.log("This is your library", Book.myLibrary);
    }
}
/* This is how you call constructors/methods from the class if you create an instance
const lib = new Book("Candy Town", "John Doe", 267, "read");
lib.info();
lib.addBookToLibrary("Another Book", "John Doe", 123, "not read");
lib.addBookToLibrary("book3", "John Doe", 64, "read");
lib.theLibrary();
*/
// But because the methods in the class are static methods you don't have to create an instance in order to use them
Book.addBookToLibrary("1984", "George Orwell", 328, "read"); // non static methods require an instance
//Static methods belong to the class itself, so they can be called directly with Book.addBookToLibrary



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

        Book.addBookToLibrary(title, author, numOfPages, read)

        console.log(Book.myLibrary)

        console.log("Updated books array:", Book.myLibrary);

        bookForm.reset();
        popupForm.style.display = 'none';

        showLibrary();

    })

    function showLibrary(){
        const libraryContainer = document.getElementById('libraryContainer');
       
        libraryContainer.innerHTML = '';

        Book.myLibrary.forEach((book, index) => {
            
            
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
        Book.myLibrary.splice(index, 1); // Remove the book at the specified index
        showLibrary(); // Re-render the library
    }    
    // function to change status
    function changeStatus(index) {
        const book = Book.myLibrary[index];
        book.read = book.read === 'read' ? 'not read yet' : 'read';
        showLibrary(); // Re-render the library to reflect the status change
    }
})

