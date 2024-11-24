import { STARTUP_BY_ID_QUERY } from "@/lib/queries";
import { formDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactElement } from "react";

export const experimental_ppr = true;

interface StartupPageProps {
  params: Promise<{ id: string }>;
}

const StartupPage: FC<StartupPageProps> = async ({ params }): Promise<ReactElement> => {
  const id = (await params).id;
  console.log(id);

  /**
   *
   * @description Fetches a single startup by ID using the `STARTUP_BY_ID_QUERY` query.
   * @param {string} id - The ID of the startup to fetch.
   * @returns {Promise<import("@/lib/types").Startup | null>} The fetched startup, or null if not found.
   * @description If the startup is not found, return a 404 not found response.
   *
   */
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img src={post.image} alt={`thmbnail of ${post.title}`} className="w-full h-auto rounded-xl" />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`}></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartupPage;
