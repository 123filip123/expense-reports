export const formatStringOnlyDigits = (str: string) => {
  return str.replace(/\D/g, "");
};

// Tremor cx [v0.0.0]

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}
