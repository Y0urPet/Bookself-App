let bookList = [];

function makeBook(book){
    book.preventDefault();
    const bookTitle = document.querySelector("#inputBookTitle");
    const bookAuthor = document.querySelector("#inputBookAuthor");
    const bookYear = document.querySelector("#inputBookYear");
    const bookIsComplete = document.querySelector("#inputBookIsComplete");
    const listBookData = {
        id:+new Date,
        title:bookTitle.value,
        author:bookAuthor.value,
        year:bookYear.value,
        isComplete:bookIsComplete.checked,
    };
    console.log(listBookData);
    bookList.push(listBookData);
    document.dispatchEvent(new Event("bookChanged"));
    alert("Buku Telah dimasukkan!")
}

function bookComplete(book){
    const bookId = Number(book.target.id);
    bookIndex = bookList.findIndex((function(result){
        return result.id === bookId
    }));
    bookIndex !== -1  && (
        bookList[bookIndex] = {
            ...bookList[bookIndex],
            isComplete:!0
        },
        document.dispatchEvent(new Event("bookChanged"))
    )
    alert("Buku Telah selesai dibaca!")
}

function bookNotComplete(book){
    const bookId = Number(book.target.id);
    bookIndex = bookList.findIndex((function(result){
        return result.id === bookId
    }));
    bookIndex !== -1 && (
        bookList[bookIndex] = {
            ...bookList[bookIndex],
            isComplete:!1
        },
        document.dispatchEvent(new Event("bookChanged"))
    )
    alert("Buku Telah dikembalikan!")
}

function deleteBook(book){
    const bookId = Number(book.target.id);
    bookIndex = bookList.findIndex((function(result){
        return result.id === bookId
    }));
    bookIndex !== -1 && (
        bookList.splice(bookIndex,1),
        document.dispatchEvent(new Event("bookChanged"))
    )
    alert("Buku telah dihapuskan")
}

function bookRowList(book){
    const incompleteBook = document.querySelector("#incompleteBookshelfList");
    const comepleteBook = document.querySelector("#completeBookshelfList");
    incompleteBook.innerHTML = "";
    comepleteBook.innerHTML = "";
    for(const books of book){
        const article = document.createElement("article");
        const title = document.createElement("h2");
        const author = document.createElement("p");
        const year = document.createElement("p");
        const bookDiv = document.createElement("div");
        const completeButton = document.createElement("button");
        const incompleteButton = document.createElement("button");

        article.classList.add("book_item");
        title.innerText = books.title;
        author.innerText = "Penulis: "+books.author;
        if(year.innerText = "Tahun: " + books.year,article.appendChild(title),article.appendChild(author),article.appendChild(year),books.isComplete){
            
            bookDiv.classList.add("action");
            completeButton.id = books.id;
            completeButton.innerText = "Belum Selesai dibaca";
            completeButton.classList.add("green");
            completeButton.addEventListener("click",bookNotComplete);
            
            incompleteButton.id = books.id,incompleteButton.innerText = "Hapus buku";
            incompleteButton.classList.add("red");
            incompleteButton.addEventListener("click",deleteBook);

            bookDiv.appendChild(completeButton);
            bookDiv.appendChild(incompleteButton);
            article.appendChild(bookDiv);
            comepleteBook.appendChild(article);
        }else{
            bookDiv.classList.add("action");
            completeButton.id = books.id;
            completeButton.innerText = "Selesai dibaca";
            completeButton.classList.add("green");
            completeButton.addEventListener("click",bookComplete);
            
            incompleteButton.id = books.id,incompleteButton.innerText = "Hapus buku";
            incompleteButton.classList.add("red");
            incompleteButton.addEventListener("click",deleteBook);

            bookDiv.appendChild(completeButton);
            bookDiv.appendChild(incompleteButton);
            article.appendChild(bookDiv);
            incompleteBook.appendChild(article);
        }
    }
}
function bookLocalStorage(){
    !function(book){
        localStorage.setItem("books",JSON.stringify(book))
    }(bookList);
    bookRowList(bookList);
}

function searchBook(book){
    book.preventDefault();
    const search = document.querySelector("#searchBookTitle");
    query = search.value,query?bookRowList(bookList.filter((
        function(result){
            return result.title.toLowerCase().includes(query.toLowerCase())
        }
    ))):bookRowList(bookList)
}

window.addEventListener("load",(function(){
    const inputBook = document.querySelector("#inputBook");
    const bookQuery = document.querySelector("#searchBook");
    
    bookList = JSON.parse(localStorage.getItem("books")) || [],bookRowList(bookList);
    inputBook.addEventListener("submit",makeBook);
    bookQuery.addEventListener("submit",searchBook);
    document.addEventListener("bookChanged",bookLocalStorage);
}))
