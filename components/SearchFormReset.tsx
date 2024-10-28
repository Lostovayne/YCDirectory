'use client';
import { X } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

const SearchFormReset: FC = ({}): ReactElement => {
	const reset = () => {
		const form = document.querySelector('.search-form') as HTMLFormElement;
		if (form) {
			form.reset();
		}
	};

	return (
		<button
			className=''
			type='reset'
			onClick={reset}>
			<Link
				href='/'
				className='search-btn text-white'>
				<X className='size-5' />
			</Link>
		</button>
	);
};

export default SearchFormReset;
