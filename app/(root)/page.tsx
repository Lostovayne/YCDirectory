import React from 'react';

export default function Home(): React.ReactElement {
	console.log('Welcome to Next.js');
	console.log('Estoy del lado del servidor');

	return (
		<>
			<section className='pink_container'>
				<h1 className='heading'>
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>
				<p className='sub-heading !max-w-3xl'>
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
				</p>
			</section>
		</>
	);
}
