import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const enum ItemTipo {
	UNIDADE = 'uni',
	KILO = 'kg'
}

/**
 * Concatenates multiple class values into a single string and applies Tailwind CSS utility classes.
 *
 * @param inputs - An array of class values to be concatenated.
 * @return - The concatenated string of class values with Tailwind CSS utility classes applied.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
	 * Creates a debounced version of the provided function which will only be executed after the specified delay
	 * since the last call. The function is called with the same arguments as the original function and the `this`
	 * context is preserved.
	 * @param fn The function to be debounced
	 * @param delay The delay in milliseconds
	 * @returns A function that will only be executed after the specified delay since the last call.
	 */
export function debounce<F extends (...args: any[]) => any>(
	fn: F,
	delay: number
): (...args: Parameters<F>) => ReturnType<F> {
	let timeout: ReturnType<typeof setTimeout>;
	return function (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn.apply(this, args), delay);
		return fn.apply(this, args);
	};
}