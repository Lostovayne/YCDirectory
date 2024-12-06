"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";

export const createPitch = async (prevState: any, form: FormData, pitch: string) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "You must be logged in to create a pitch",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      pitch,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session!.id, // session?.id,
      },
    };

    // Crear el startup en Sanity
    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      data: result,
      status: "SUCCESS",
      error: null,
    });
  } catch (error) {
    return parseServerActionResponse({
      error: error instanceof Error ? error.message : "Something went wrong",
      status: "ERROR",
    });
  }
};
