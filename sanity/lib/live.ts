import { client } from "@/sanity/lib/client";
import { defineLive } from "next-sanity";
import "server-only";

export const { sanityFetch, SanityLive } = defineLive({ client });
