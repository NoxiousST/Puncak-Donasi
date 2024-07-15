import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import date from "date-and-time"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const paymentDate = (now: Date, created: number) => {
    const d = new Date(created * 1000)
    if (!date.isSameDay(now, d)) return date.format(d, "dddd, DD MMMM YYYY")
    const difference = date.subtract(now, d)
    return difference.toHours() < 1 ? `${difference.toMinutes().toFixed()} menit yang lalu` : `${difference.toHours().toFixed()} jam yang lalu`
}

export const newsDate = (now: Date, added: Date) => {
    const difference = date.subtract(now, added)
    if (difference.toDays() > 7) return date.format(added, "DD MMMM YYYY")
    if (!date.isSameDay(now, added)) return `${difference.toDays().toFixed()} hari yang lalu`
    return difference.toHours() < 1 ? `${difference.toMinutes().toFixed()} menit yang lalu` : `${difference.toHours().toFixed()} jam yang lalu`
}

