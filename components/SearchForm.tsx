import { Search } from 'lucide-react';
import Form from 'next/form';
import { FC, ReactElement } from 'react';
import SearchFormReset from './SearchFormReset';

interface Props {
	query?: string;
}

const SearchForm: FC<Props> = ({ query }): ReactElement => {
	return (
		<Form
			action='/'
			scroll={false}
			className='search-form'>
			<input
				name='query'
				defaultValue={query}
				className='search-input'
				type='text'
				placeholder='Search Startups...'
			/>

			<div className='flex gap-2'>
				{query ? (
					<SearchFormReset />
				) : (
					<button
						type='submit'
						className='search-btn text-white'>
						<Search className='size-5' />
					</button>
				)}
			</div>
		</Form>
	);
};

export default SearchForm;
