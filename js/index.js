const bookTemplate = document.getElementById("book-template").content;
for (let i = 0; i < 5; i++) {
    const newBook = bookTemplate.cloneNode(true);
    document.getElementById("bookList").appendChild(newBook);
}
