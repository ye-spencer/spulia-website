import Header from "@/components/header";
import Link from "next/link";

export default function BookReview() {

    
    return (
        <div>
            <Header />
            <h1> Book Review </h1>
            <Link href="/bookReview/add"> [Add a book review]</Link>
            <p> Coming soon...</p>
        </div>
    );
}

// TODO: make book review page