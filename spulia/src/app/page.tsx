import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
    return (
      <div>
        <Header />
        <Link href="/bookReview"> Book Review </Link>
        <Link href="/"> Home Page</Link>
      </div>
    );
}
