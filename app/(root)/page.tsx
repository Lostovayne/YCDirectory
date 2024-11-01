import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import React from 'react';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}): Promise<React.ReactNode> {
	const query = (await searchParams).query;

	const posts = [
		{
			_createdAt: new Date().toISOString(),
			views: 55,
			author: {
				_id: '1',
				name: 'Rohan',
			},
			description: 'This is a description',
			image: 'https://picsum.photos/200/300',
			category: 'Robots',
			title: 'This is a title',
		},
	];

	return (
		<>
			<section className='pink_container'>
				<h1 className='heading'>
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>
				<p className='sub-heading !max-w-3xl'>
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
				</p>
				<SearchForm query={query} />
			</section>

			<section className='section_container'>
				<p className='text-30-semibold'>{query ? `Search Results for "${query}"` : `All Startups`}</p>
				<ul className='mt-7 card-grid'>
					{posts?.length > 0 ?
						posts.map((post: StartupCardType, index: number) => (
							<StartupCard
								key={index} //post?._id
								post={post}
							/>
						))
					:	<p className='no-results'>No Startups Found </p>}
				</ul>
			</section>
		</>
	);
}
