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

export interface DateBucketlistItem {
    id: number;
    title: string;
    description: string;
    city: string;
    addedBy: string;
    done: boolean;
    createdAt: string;
}