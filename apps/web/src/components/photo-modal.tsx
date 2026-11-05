"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PhotoModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") router.back();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close photo"
        className="absolute inset-0 bg-black/70"
        onClick={() => router.back()}
      />
      <div
        className="relative max-h-full max-w-3xl rounded bg-white p-4"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute top-2 right-2 rounded bg-gray-900 px-3 py-1 text-white hover:bg-gray-800"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
