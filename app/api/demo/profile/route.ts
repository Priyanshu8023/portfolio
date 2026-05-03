import { NextRequest, NextResponse } from "next/server";

function delayForUserId(userId: string): number {
  const id = userId.toLowerCase();
  // Wide gap makes the stale-response race easy to hit in one click.
  if (id === "alice" || id === "slow") return 5000;
  if (id === "bob" || id === "fast") return 60;
  return 800;
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("userId") ?? "";
  const userId = /^[a-z0-9_-]{1,32}$/i.test(raw) ? raw : "invalid";

  const delayMs = delayForUserId(userId);
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (userId === "invalid") {
    return NextResponse.json(
      { userId: "invalid", name: "Invalid user id", delayMs },
      { status: 400 }
    );
  }

  const label =
    userId.charAt(0).toUpperCase() + userId.slice(1).toLowerCase();

  return NextResponse.json({
    userId,
    name: `${label} (${delayMs}ms server delay)`,
    delayMs,
  });
}