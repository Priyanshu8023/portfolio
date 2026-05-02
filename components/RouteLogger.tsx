"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteLogger() {
  const pathname = usePathname();

  useEffect(() => {
    console.log(`[Portfolio] Page visited: ${pathname}`);
  }, [pathname]);

  return null;
}
