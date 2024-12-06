/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { formDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import markdownit from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactElement, Suspense } from "react";

export const experimental_ppr = true;

interface StartupPageProps {
  params: Promise<{ id: string }>;
}

const md = markdownit();

const StartupPage: FC<StartupPageProps> = async ({ params }): Promise<ReactElement> => {
  const id = (await params).id;

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

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt={`thmbnail of ${post.title}`}
          className="w-full aspect-video object-cover h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
              <Image
                src={post.author?.image}
                alt={post.author?.name}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">@{post.author?.username}</p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>

          {parsedContent ?
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          : <p className="no-results">No details provided</p>}
        </div>
        <hr className="divider" />

        {/* Editor selected startup */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default StartupPage;
