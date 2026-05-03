import { Suspense } from "react";
import RaceBugDemo from "@/components/RaceBugDemo";

export default function RaceBugDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black p-8 text-white">Loading…</div>
      }
    >
      <RaceBugDemo />
    </Suspense>
  );
}
