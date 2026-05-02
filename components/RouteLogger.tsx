"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const log = (...args: unknown[]) => {
  console.log(...args);
};

export default function RouteLogger() {
  const pathname = usePathname();

  useEffect(() => {
    log(`[Portfolio] Page visited: ${pathname}`);
  }, [pathname]);

  return null;
}
