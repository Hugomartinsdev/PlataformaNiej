"use client";

import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

export function GoBackButton() {
  const router = useRouter();

  return (
    <div className="max-lg:hidden">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
      >
        <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        Residentes
      </button>
    </div>
  );
}
