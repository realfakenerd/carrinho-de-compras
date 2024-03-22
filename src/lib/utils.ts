import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Concatenates multiple class values into a single string and applies Tailwind CSS utility classes.
 *
 * @param inputs - An array of class values to be concatenated.
 * @return - The concatenated string of class values with Tailwind CSS utility classes applied.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}