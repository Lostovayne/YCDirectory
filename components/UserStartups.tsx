import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { ReactElement } from "react";
import StartupCard, { type StartupTypeCard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }): Promise<ReactElement> => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ?
        startups.map((startup: StartupTypeCard) => <StartupCard key={startup._id} post={startup} />)
      : <p className="no-result">No startups found</p>}
    </>
  );
};

export default UserStartups;
