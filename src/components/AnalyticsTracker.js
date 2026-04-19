"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MEASUREMENT_ID = "G-SGKL4YT014";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
