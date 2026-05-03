import Link from "next/link";
import { anton, unbounded } from "@/lib/font";

const PROJECTS = [
  "Recovera - AI-powered incident response assistant",
  "Portfolio Website - personal brand and work showcase",
  "Automation Scripts - workflow and developer productivity tools",
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className={`${anton.className} text-5xl md:text-7xl`}>Projects</h1>
        <ul className={`${unbounded.className} mt-8 space-y-4 text-sm leading-7 text-zinc-300 md:text-base`}>
          {PROJECTS.map((project) => (
            <li key={project} className="rounded-md border border-white/15 px-4 py-3">
              {project}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/race-bug-demo"
            className="inline-block rounded-md border border-amber-500/40 px-5 py-2 text-sm text-amber-200/90 hover:bg-amber-500/20 transition-colors"
          >
            Demo: async race bug
          </Link>
          <Link
            href="/"
            className="inline-block rounded-md border border-white/35 px-5 py-2 text-sm hover:bg-white hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
