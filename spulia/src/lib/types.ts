export interface BookInfo {
    title: string;
    author: string;
}

export interface BookIdentifier extends BookInfo {
    id: string;
}

export interface BookReviewType {
    bookId: string;
    rating: string;
    favoriteLine: string;
    favoriteCharacter: string;
    leastFavoriteCharacter: string;
    comments: string;
}