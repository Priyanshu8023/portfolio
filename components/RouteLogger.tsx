"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ClientLogPayload = {
  level?: "info" | "warn" | "error";
  message: string;
  type: string;
  pathname?: string;
  stack?: string;
};

const sendLog = async (payload: ClientLogPayload) => {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Avoid crashing UI if logging API is temporarily unavailable.
  }
};

export default function RouteLogger() {
  const pathname = usePathname();

  useEffect(() => {
    void sendLog({
      level: "info",
      message: "Page visited",
      type: "page_visit",
      pathname,
    });
  }, [pathname]);

  useEffect(() => {
    const handleRuntimeError = (event: ErrorEvent) => {
      void sendLog({
        level: "error",
        message: event.message || "Client runtime error",
        type: "runtime_error",
        pathname,
        stack: event.error?.stack,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        typeof event.reason === "string"
          ? event.reason
          : event.reason?.message || "Unhandled promise rejection";

      const stack =
        typeof event.reason === "object" &&
        event.reason &&
        "stack" in event.reason
          ? String((event.reason as { stack?: unknown }).stack ?? "")
          : undefined;

      void sendLog({
        level: "error",
        message: reason,
        type: "unhandled_rejection",
        pathname,
        stack,
      });
    };

    window.addEventListener("error", handleRuntimeError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleRuntimeError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, [pathname]);

  return null;
}
