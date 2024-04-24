import { clsx, type ClassValue } from 'clsx';
import { toast } from 'svelte-sonner';
// @ts-expect-error boring error
import { twMerge } from 'tailwind-merge';
import { read, utils } from 'xlsx';

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

export function handleFile(e: Event) {
	const { files } = e.target as HTMLInputElement;
	const file = files?.item(0);
	if (!file) return;

	if (!file.type.startsWith('application/vnd')) {
		toast.error('Tipo invalido de arquivo', {
			description: 'Apenas arquivos .xlsx e .ods são permitidos',
			duration: 3000
		});
		return;
	}

	return file;
}

interface ImportedData {
	Produto: string;
	Valor: number;
	Tipo: ItemTipo;
}

/**
 * Reads the content of an Excel file, converts it to JSON, and displays a success message if imported successfully,
 * or an error message if there is an error.
 *
 * @param file - The Excel file to be read
 * @return The JSON data extracted from the Excel file
 */
export async function readXLSX(file: File | undefined) {
	try {
		const arrayBuffer = await file?.arrayBuffer();
		const wb = read(arrayBuffer);
		const sheet = wb.Sheets[wb.SheetNames[0]];
		const json = utils.sheet_to_json<ImportedData>(sheet);

		toast.success(`Importado com sucesso`, {
			description: `Importado ${json.length} itens ao mercado`,
			duration: 2000
		});

		return json;
	} catch (error) {
		toast.error((error as Error).name, {
			description: (error as Error).message
		});
	}
}
