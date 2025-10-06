import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Header />
        <main className="w-full max-w-md mt-16 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center border border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Welcome!</h1>
          <nav className="flex flex-col gap-4 w-full">
            <Link
              href="/bookReview"
              className="block w-full text-center py-3 rounded-full bg-blue-50 text-blue-800 font-semibold text-lg border border-blue-200 shadow hover:bg-blue-100 transition"
            >
              Book Review
            </Link>
            <Link
              href="/music"
              className="block w-full text-center py-3 rounded-full bg-pink-50 text-pink-800 font-semibold text-lg border border-pink-200 shadow hover:bg-pink-100 transition"
            >
              Music
            </Link>
            <Link
              href="/pictures"
              className="block w-full text-center py-3 rounded-full bg-green-50 text-green-800 font-semibold text-lg border border-green-200 shadow hover:bg-green-100 transition"
            >
              Pictures
            </Link>
          </nav>
        </main>
      </div>
    );
}
