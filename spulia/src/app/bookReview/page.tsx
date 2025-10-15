"use client";

import Header from "@/components/header";
import Link from "next/link";
import { getBookReviews, getBooks } from "./actions";
import { useEffect, useState } from "react";
import { BookIdentifier, BookReviewType } from "@/lib/types";
export default function BookReview() {

    const [books, setBooks] = useState<BookIdentifier[]>([]);
    const [spencerReviews, setSpencerReviews] = useState<BookReviewType[]>([]);
    const [juliaReviews, setJuliaReviews] = useState<BookReviewType[]>([]);

    useEffect(() => {
        async function fetchBooks() {
            const bookList = await getBooks();
            setBooks(bookList);
        }
        async function fetchSpencerReviews() {
            const spencerReviews = await getBookReviews("Spencer");
            setSpencerReviews(spencerReviews);
        }
        async function fetchJuliaReviews() {
            const juliaReviews = await getBookReviews("Julia");
            setJuliaReviews(juliaReviews);
        }
        fetchBooks();
        fetchSpencerReviews();
        fetchJuliaReviews();
    }, []);

    
    return (
        <div className="min-h-screen flex flex-col items-center pb-16">
            <Header />
            <main className="w-full max-w-4xl flex flex-col items-center px-4">
                <h1 className="mt-8 mb-2 text-4xl font-extrabold tracking-tight text-purple-900 drop-shadow-lg">Book Reviews</h1>
                <Link
                    href="/bookReview/add"
                    className="mb-6 mt-2 block px-4 py-2 font-medium rounded-lg shadow-md transition hover:bg-gray-100"
                >
                    + Add a book review
                </Link>
                <section className="w-full space-y-10">
                    {books.length === 0 ? (
                        <div className="text-lg text-gray-700 text-center pt-12">
                            No books available yet.
                        </div>
                    ) : (
                        books.map((book) => (
                            <div key={book.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
                                <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                                    <span>{book.title}</span>
                                    <span className="text-gray-400 text-base">by</span>
                                    <span className="italic text-gray-900">{book.author}</span>
                                </h3>
                                <div className="flex flex-col md:flex-row gap-6 mt-3">
                                    {/* Spencer's Review */}
                                    <div className="flex-1 rounded-lg shadow px-5 py-3">
                                        <h4 className="font-bold text-purple-700 mb-1 text-center">Spencer</h4>
                                        {(() => {
                                            const review = spencerReviews.find(review => review.bookId === book.id);
                                            if (!review)
                                                return <div className="text-gray-400 italic text-   center">No review yet.</div>;
                                            return (
                                                <ul className="text-gray-800 space-y-1">
                                                    <li>
                                                        <span className="font-medium text-blue-700">Rating:</span> <span>{review.rating || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-blue-700">Favorite Line:</span> <span>{review.favoriteLine || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-blue-700">Favorite Character:</span> <span>{review.favoriteCharacter || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-blue-700">Least Favorite Character:</span> <span>{review.leastFavoriteCharacter || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-blue-700">Comments:</span> <span>{review.comments || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                </ul>
                                            );
                                        })()}
                                    </div>
                                    {/* Julia's Review */}
                                    <div className="flex-1 rounded-lg shadow px-5 py-3">
                                        <h4 className="font-bold text-pink-700 mb-1 text-center">Julia</h4>
                                        {(() => {
                                            const review = juliaReviews.find(review => review.bookId === book.id);
                                            if (!review)
                                                return <div className="text-gray-400 italic text-center">No review yet.</div>;
                                            return (
                                                <ul className="text-gray-800 space-y-1">
                                                    <li>
                                                        <span className="font-medium text-pink-700">Rating:</span> <span>{review.rating || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-pink-700">Favorite Line:</span> <span>{review.favoriteLine || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-pink-700">Favorite Character:</span> <span>{review.favoriteCharacter || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-pink-700">Least Favorite Character:</span> <span>{review.leastFavoriteCharacter || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                    <li>
                                                        <span className="font-medium text-pink-700">Comments:</span> <span>{review.comments || <span className="italic text-gray-400">—</span>}</span>
                                                    </li>
                                                </ul>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}

// TODO: make book review page