import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, createTV } from 'tailwind-variants';

export const tv = createTV({
  twMerge: false,
});

export type { VariantProps };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
