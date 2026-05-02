import Link from "next/link";
import { anton, unbounded } from "@/lib/font";

const SKILLS = [
  "Frontend: React, Next.js, Tailwind CSS",
  "Backend: Node.js, Express, API Design",
  "Database: PostgreSQL, Prisma, MongoDB",
  "Tools: Git, Docker, CI/CD",
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className={`${anton.className} text-5xl md:text-7xl`}>Skills</h1>
        <ul className={`${unbounded.className} mt-8 space-y-4 text-sm leading-7 text-zinc-300 md:text-base`}>
          {SKILLS.map((skill) => (
            <li key={skill} className="rounded-md border border-white/15 px-4 py-3">
              {skill}
            </li>
          ))}
        </ul>
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
