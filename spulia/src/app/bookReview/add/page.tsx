"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { addBookReview, getBookReview, getReviewedBooks } from "./actions";
import { usePersonStore } from "@/lib/localStorage";
import { BookIdentifier, BookInfo } from "@/lib/types";

function AddBookReview() {


    const [formData, setFormData] = useState({
        rating: "",
        favoriteLine: "",
        favoriteCharacter: "",
        leastFavoriteCharacter: "",
        comments: "",
    });

    const [bookData, setBookData] = useState({
        id: "-1",
        title: "",
        author: "",
    });

    const [books, setBooks] = useState<BookIdentifier[]>([]);
    const [selectedBook, setSelectedBook] = useState("-1");
    const { person, setPerson } = usePersonStore();

    useEffect(() => {
        async function fetchBooks() {
            const books = await getReviewedBooks();
            setBooks(books);    
        }
        fetchBooks();
    }, []);

    async function handleBookSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedBook(e.target.value);
        setBookData({
            id: e.target.value,
            title: books.find(book => book.id === e.target.value)?.title || "Unknown",
            author: books.find(book => book.id === e.target.value)?.author || "Unknown",
        });

        const bookReview = await getBookReview(e.target.value, person);
        setFormData({
            rating: bookReview.rating,
            favoriteLine: bookReview.favoriteLine,
            favoriteCharacter: bookReview.favoriteCharacter,
            leastFavoriteCharacter: bookReview.leastFavoriteCharacter,
            comments: bookReview.comments,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBookReview(bookData, formData, bookData.id, person);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col items-center">
            
            <Header />
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 m-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">Add a Book Review</h1>

                <div className="mb-6">
                    <label htmlFor="book" className="block text-sm font-semibold text-gray-700 mb-2">
                        Choose a Book
                    </label>
                    <select
                        id="book"
                        value={selectedBook}
                        onChange={handleBookSelect}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        {books.map((book: BookIdentifier) => (
                            <option key={book.id} value={book.id}>
                                {book.title} - {book.author}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    {selectedBook !== "-1" ? (
                        <div className="space-y-4">
                            <Label htmlFor="title" className="text-gray-600">Title</Label>
                            <Input id="title" value={bookData.title} readOnly className="bg-gray-100 cursor-not-allowed" />
                            <Label htmlFor="author" className="text-gray-600 mt-2">Author</Label>
                            <Input id="author" value={bookData.author} readOnly className="bg-gray-100 cursor-not-allowed" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Label htmlFor="title" className="text-gray-600">Title</Label>
                            <Input
                                id="title"
                                value={bookData.title}
                                onChange={e => setBookData({ ...bookData, title: e.target.value })}
                                placeholder="Enter the book title"
                            />
                            <Label htmlFor="author" className="text-gray-600 mt-2">Author</Label>
                            <Input
                                id="author"
                                value={bookData.author}
                                onChange={e => setBookData({ ...bookData, author: e.target.value })}
                                placeholder="Enter the author's name"
                            />
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="rating" className="block text-gray-600 mb-1">Rating</Label>
                        <Input
                            id="rating"
                            value={formData.rating}
                            onChange={e => setFormData({ ...formData, rating: e.target.value })}
                            placeholder="Rotten Tomatoes score"
                        />
                    </div>
                    <div>
                        <Label htmlFor="favoriteline" className="block text-gray-600 mb-1">Favorite Line</Label>
                        <Input
                            id="favoriteline"
                            value={formData.favoriteLine}
                            onChange={e => setFormData({ ...formData, favoriteLine: e.target.value })}
                            placeholder="Favorite quote from the book"
                        />
                    </div>
                    <div>
                        <Label htmlFor="favoritecharacter" className="block text-gray-600 mb-1">Favorite Character</Label>
                        <Input
                            id="favoritecharacter"
                            value={formData.favoriteCharacter}
                            onChange={e => setFormData({ ...formData, favoriteCharacter: e.target.value })}
                            placeholder="Favorite character"
                        />
                    </div>
                    <div>
                        <Label htmlFor="leastfavoritecharacter" className="block text-gray-600 mb-1">Least Favorite Character</Label>
                        <Input
                            id="leastfavoritecharacter"
                            value={formData.leastFavoriteCharacter}
                            onChange={e => setFormData({ ...formData, leastFavoriteCharacter: e.target.value })}
                            placeholder="Least favorite character"
                        />
                    </div>
                    <div>
                        <Label htmlFor="comments" className="block text-gray-600 mb-1">Comments</Label>
                        <Input
                            id="comments"
                            value={formData.comments}
                            onChange={e => setFormData({ ...formData, comments: e.target.value })}
                            placeholder="Share your thoughts"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors font-semibold"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddBookReview;