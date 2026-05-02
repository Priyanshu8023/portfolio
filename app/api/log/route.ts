import { NextRequest, NextResponse } from "next/server";
import { error, log, warn } from "@/lib/logger";

type ClientLogBody = {
  level?: "info" | "warn" | "error";
  message?: string;
  type?: string;
  pathname?: string;
  stack?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ClientLogBody;

    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json(
        { ok: false, error: "message is required" },
        { status: 400 }
      );
    }

    const level = body.level ?? "info";
    const context = {
      source: "client",
      type: body.type ?? "event",
      pathname: body.pathname ?? "unknown",
      stack: body.stack,
      userAgent: request.headers.get("user-agent") ?? "unknown",
      ip:
        request.headers.get("x-forwarded-for") ??
        request.headers.get("x-real-ip") ??
        "unknown",
    };

    if (level === "error") {
      error(body.message, context);
    } else if (level === "warn") {
      warn(body.message, context);
    } else {
      log(body.message, context);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    error("Failed to process client log request", {
      source: "server",
      type: "api_error",
      details: err instanceof Error ? err.message : String(err),
    });

    return NextResponse.json(
      { ok: false, error: "invalid request body" },
      { status: 400 }
    );
  }
}
