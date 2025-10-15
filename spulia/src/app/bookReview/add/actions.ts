import { BookInfo, BookReview } from "@/lib/types";


export async function getReviewedBooks() {
    const response = await fetch("/api/books");
    const data = await response.json();

    const books = [{ id: "-1", title: "New Title", author: "New Author" }];

    for (const book of data.bookReviews) {
        book.id = book.id.toString();
        book.title = book.title.toString();
        book.author = book.author.toString();
        books.push(book);
    }

    return books;
}

async function addBook(book: BookInfo) {
    const response = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(book),
    });
    const data = await response.json();

    console.log(data);
    if (data.book.length !== 1) {
        return { id: "-1", title: "New Title", author: "New Author" };
    }

    return data.book[0];
}

export async function addBookReview(bookInfo : BookInfo, bookReview: BookReview, id: string, person: string) {

    if (id === "-1") {
        const book = await addBook({
            title: bookInfo.title,
            author: bookInfo.author,
        });
        console.log(book);
        id = book.id;
    }

    const response = await fetch(`/api/bookReviews/individual?id=${id}&person=${person}`, {
        method: "PATCH",
        body: JSON.stringify(bookReview),
    });
    const data = await response.json();
    return data;
}

export async function getBookReview(id: string, person: string) {

    const response = await fetch(`/api/bookReviews/individual?id=${id}&person=${person}`);

    if (response.status === 404) {
        return {
            rating: "",
            favoriteLine: "",
            favoriteCharacter: "",
            leastFavoriteCharacter: "",
            comments: "",
        };
    }
    const data = await response.json();
    return data;
}
