"use client";

import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { dotSpinner } = await import("ldrs");
      dotSpinner.register();
    }
    getLoader();
  }, []);
  return <l-dot-spinner size="40" speed="1.3" color="#519ee6"></l-dot-spinner>;
}
