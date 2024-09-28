import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function NormalizeTextToSearch(text: string) {
  const search = text.replace("-", " ").toLowerCase();

  return search;
}

export function NormalizeTextToSlug(text: string) {
  const slug = text.replace(" ", "-").toLowerCase();

  return slug;
}
