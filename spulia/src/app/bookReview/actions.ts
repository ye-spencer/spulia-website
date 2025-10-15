export async function getBooks() {
    const response = await fetch("/api/books");
    const data = await response.json();
    return data.bookReviews;
}

export async function getBookReviews(person: string) {
    const response = await fetch(`/api/bookReviews/individual?person=${person}`);
    const data = await response.json();
    return data;
}