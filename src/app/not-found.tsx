"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button/button";

export default function NotFoundPage() {
  return (
    <main className="bg-gradient-primary flex min-h-dvh w-full flex-col items-center justify-center px-5">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <h1 className="text-gradient-primary text-[120px] font-bold leading-none tracking-tight">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-gray-800">
          Page not found
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist
          <br />
          or may have been moved.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3">
          <Link href="/hub" className="w-full">
            <Button variant="primary" size="lg">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
