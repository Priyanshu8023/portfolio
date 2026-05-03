"use client";

/**
 * Intentional bug: fetches in useEffect without AbortController or stale guards.
 * If you switch from Alice (slow) to Bob (fast), Bob’s response can arrive first
 * and then Alice’s late response overwrites state — URL shows Bob but UI shows Alice.
 * `npm run build` passes because this is a runtime ordering issue, not a type error.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Profile = { userId: string; name: string; delayMs: number };

export default function RaceBugDemo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? "alice";
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  /** Starts the slow Alice request, then jumps to Bob before Alice finishes — overlap every time. */
  const triggerRaceInOneClick = () => {
    router.replace("/race-bug-demo?userId=alice");
    setTimeout(() => {
      router.replace("/race-bug-demo?userId=bob");
    }, 15);
  };

  useEffect(() => {
    setLoading(true);
    setProfile(null);

    fetch(`/api/demo/profile?userId=${encodeURIComponent(userId)}`)
      .then(async (r) => {
        const data = (await r.json()) as Profile;
        return r.ok ? data : null;
      })
      .then((data) => {
        if (data) setProfile(data);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const mismatch =
    profile !== null && profile.userId.toLowerCase() !== userId.toLowerCase();

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-xs uppercase tracking-wide text-amber-400/90">
          Educational demo — intentional async race
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">
          Stale response race
        </h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          Alice’s profile waits <strong className="text-zinc-200">~5s</strong> on
          the server; Bob’s <strong className="text-zinc-200">~60ms</strong>. Use
          the button below to overlap both requests without timing your clicks —
          the URL should end on Bob while the card can still flip back to Alice
          when her slow response arrives last.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={triggerRaceInOneClick}
            className="rounded-md border border-amber-400/60 bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/25 transition-colors"
          >
            Trigger race (one click)
          </button>
          <Link
            href="/race-bug-demo?userId=alice"
            className="rounded-md border border-white/35 px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
          >
            Alice (slow)
          </Link>
          <Link
            href="/race-bug-demo?userId=bob"
            className="rounded-md border border-white/35 px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
          >
            Bob (fast)
          </Link>
        </div>

        <div className="rounded-lg border border-white/15 bg-white/5 p-4 text-sm">
          <p>
            <span className="text-zinc-500">URL userId:</span>{" "}
            <code className="text-emerald-300">{userId}</code>
          </p>
          <p className="mt-2">
            <span className="text-zinc-500">State from last fetch:</span>{" "}
            {loading ? (
              <span className="text-zinc-400">Loading…</span>
            ) : profile ? (
              <code className="text-emerald-300">{profile.userId}</code>
            ) : (
              <span className="text-zinc-400">—</span>
            )}
          </p>
          {mismatch && (
            <p className="mt-3 text-amber-300">
              Mismatch: UI reflects user{" "}
              <strong>{profile?.userId}</strong> but URL is{" "}
              <strong>{userId}</strong>.
            </p>
          )}
          {!loading && profile && (
            <p className="mt-3 text-zinc-300">
              <span className="text-zinc-500">Name:</span> {profile.name}
            </p>
          )}
        </div>

        <p className="text-xs text-zinc-500">
          Fix: pass{" "}
          <code className="text-zinc-400">AbortController</code> signal to{" "}
          <code className="text-zinc-400">fetch</code> and abort in the effect
          cleanup, or ignore responses when{" "}
          <code className="text-zinc-400">userId</code> changed.
        </p>

        <Link
          href="/projects"
          className="inline-block text-sm text-zinc-400 underline hover:text-white"
        >
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
