import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { type StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}): Promise<React.ReactNode> {
  /**
   *
   * Extrae el parámetro de búsqueda de searchParams y crea un objeto de parámetros
   * @param {Promise<{ query?: string }>} searchParams - Los parámetros de búsqueda de la URL
   * @returns {Object} params - Objeto con el parámetro de búsqueda o null
   *
   */
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log({ session: session?.id });

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : `All Startups`}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          : <p className="no-results">No Startups Found </p>}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
