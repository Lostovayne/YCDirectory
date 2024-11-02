import SearchForm from '@/components/SearchForm';
import StartupCard, { type StartupTypeCard } from '@/components/StartupCard';
import { STARTUPS_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import React from 'react';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}): Promise<React.ReactNode> {
	const query = (await searchParams).query;
	const posts = await client.fetch(STARTUPS_QUERY);

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
						posts.map((post: StartupTypeCard) => (
							<StartupCard
								key={post?._id}
								post={post}
							/>
						))
					:	<p className='no-results'>No Startups Found </p>}
				</ul>
			</section>
		</>
	);
}
