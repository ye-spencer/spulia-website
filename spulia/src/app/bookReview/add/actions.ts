export async function getReviewedBooks() {
    const response = await fetch("/api/bookReviews");
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

export async function addBookReview(bookReview: any, title: string, author: string) {
    // GET id, title, author, person, and other info, put it into a call to api
}

// FUNCTION for getting a review by id and person for filling in, also patch instead
