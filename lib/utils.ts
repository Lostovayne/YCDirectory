import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formDate(date: string) {
	return new Date(date).toLocaleDateString('es-ES', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}
