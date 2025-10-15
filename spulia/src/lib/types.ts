

export interface BookInfo {
    title: string;
    author: string;
}

export interface BookIdentifier extends BookInfo {
    id: string;
}

export interface BookReview {
    rating: string;
    favoriteLine: string;
    favoriteCharacter: string;
    leastFavoriteCharacter: string;
    comments: string;
}