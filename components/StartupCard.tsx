/* eslint-disable @next/next/no-img-element */
import { cn, formDate } from "@/lib/utils";
import type { Author, Startup } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

interface StartupProps {
  post: StartupTypeCard;
}

const StartupCard: FC<StartupProps> = ({ post }) => {
  const { _createdAt, views, author, title, category, _id, image, description } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium"> {views} </span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image src={author?.image || ""} alt="Avatar" width="60" height="60" className="rounded-full" />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup_card_desc mb-2">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;

export const StartupCardSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};
