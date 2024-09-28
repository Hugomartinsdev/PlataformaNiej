"use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

export function Theme() {
  // const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="flex items-center gap-4">
      <button
        // onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        Light
        {/* theme === "light" ? "Dark" : "Light" */}
      </button>
    </div>
  );
}
