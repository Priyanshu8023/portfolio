import Link from "next/link";
import { anton, unbounded } from "@/lib/font";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className={`${anton.className} text-5xl md:text-7xl`}>Contact</h1>
        <div className={`${unbounded.className} mt-8 space-y-3 text-sm leading-7 text-zinc-300 md:text-base`}>
          <p>Email: priya@example.com</p>
          <p>LinkedIn: linkedin.com/in/priyanshu-kumar</p>
          <p>GitHub: github.com/priyanshu</p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-block rounded-md border border-white/35 px-5 py-2 text-sm hover:bg-white hover:text-black transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
