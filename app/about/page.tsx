import Link from "next/link";
import { anton, unbounded } from "@/lib/font";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className={`${anton.className} text-5xl md:text-7xl`}>About Me</h1>
        <p className={`${unbounded.className} mt-8 text-base leading-8 text-zinc-300 md:text-lg`}>
          I am Priyanshu Kumar, a full stack developer focused on building fast,
          modern, and scalable products with clean user experiences.
        </p>
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
