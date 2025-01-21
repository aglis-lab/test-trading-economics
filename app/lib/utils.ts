import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function marketCap(price: number): string {
  if (price > 1_000_000_000) {
    return `${(price / 1_000_000_000).toPrecision(4)}B`
  }

  if (price > 1_000_000) {
    return `${(price / 1_000_000).toPrecision(4)}M`
  }

  if (price > 1_000) {
    return `${(price / 1_000).toPrecision(4)}K`
  }

  return price.toPrecision(4)
}

export function parseDate(date: string): Date {
  let parts = date.split('/')

  return new Date(+parts[2], +parts[1], +parts[0])
}

export function symbolCurrencySign(unit: string) {
  switch (unit) {
    case 'GBp': return '£'
    default: return '$'
  }
}
