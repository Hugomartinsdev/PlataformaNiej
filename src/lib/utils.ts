import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function NormalizeTextToSearch(text: string) {
  const search = text.replace("-", " ").toLowerCase();

  return search;
}

export function NormalizeTextToSlug(text: string) {//é aqui o erro, para tirar o ç e o ~
  const slug = text.replace(" ", "-").toLowerCase().replace("ç", "c").toLowerCase().replace("ã", "a").toLowerCase();

  return slug;
}
