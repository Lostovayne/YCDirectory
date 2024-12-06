import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactElement } from "react";

const UserPage = async ({ params }: { params: Promise<{ id: string }> }): Promise<ReactElement> => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  console.log({ user });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
          </div>
          <Image src={user.image} alt={user.name} width={220} height={220} className="profile_image" />
          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
        </div>
      </section>
    </>
  );
};

export default UserPage;
