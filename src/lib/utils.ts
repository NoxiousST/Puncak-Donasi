import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const HOST = import.meta.env.VITE_APP_HOST
export const SERVER = import.meta.env.VITE_APP_SERVER
