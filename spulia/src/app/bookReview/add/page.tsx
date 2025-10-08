"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { addBookReview, getReviewedBooks } from "./actions";

function AddBookReview() {


    const [formData, setFormData] = useState({
        rating: "",
        favoriteline: "",
        favoritecharacter: "",
        leastfavoritecharacter: "",
        comments: "",
    });

    const [bookData, setBookData] = useState({
        title: "",
        author: "",
    });

    const [books, setBooks] = useState<any[]>([]);
    const [selectedBook, setSelectedBook] = useState("-1");

    useEffect(() => {
        async function fetchBooks() {
            const books = await getReviewedBooks();
            setBooks(books);    
        }
        fetchBooks();
    }, []);

    function handleBookSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedBook(e.target.value);
        setBookData({
            title: books.find(book => book.id === e.target.value)?.title || "Unknown",
            author: books.find(book => book.id === e.target.value)?.author || "Unknown",
        });

        // GET AND SET REVIEWED BOOK DATA
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBookReview(formData, bookData.title, bookData.author);
    };



    return (


        <div>
            <Header />
            <h1>Add a book review</h1>

            <select id="book" value={selectedBook} onChange={handleBookSelect}>
                {books.map((book: any) => (
                    <option key={book.id} value={book.id}>{book.title} - {book.author}</option>
                ))}
            </select>

            {
                selectedBook !== "-1" && (
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={bookData.title} readOnly />
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" value={bookData.author} readOnly />
                    </div>
                )
            }
            {
                selectedBook === "-1" && (
                    <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={bookData.title} onChange={e => setBookData({ ...bookData, title: e.target.value })} />
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" value={bookData.author} onChange={e => setBookData({ ...bookData, author: e.target.value })} />
                </div>
                )
            }
            <form onSubmit={handleSubmit}>
               
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} />
                <Label htmlFor="favoriteline">Favorite Line</Label>
                <Input id="favoriteline" value={formData.favoriteline} onChange={e => setFormData({ ...formData, favoriteline: e.target.value })} />
                <Label htmlFor="favoritecharacter">Favorite Character</Label>
                <Input id="favoritecharacter" value={formData.favoritecharacter} onChange={e => setFormData({ ...formData, favoritecharacter: e.target.value })} />
                <Label htmlFor="leastfavoritecharacter">Least Favorite Character</Label>
                <Input id="leastfavoritecharacter" value={formData.leastfavoritecharacter} onChange={e => setFormData({ ...formData, leastfavoritecharacter: e.target.value })} />
                <Label htmlFor="comments">Comments</Label>
                <Input id="comments" value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })} />
                <Button type="submit">Submit</Button>

            </form>
        </div>
    );
}

export default AddBookReview;

// TODO: if book alkready has review, show the review and allow the user to edit it