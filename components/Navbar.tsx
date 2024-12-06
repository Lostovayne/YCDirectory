import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className={"px-5 py-3 bg-white shadow-sm font-work-sans"}>
      <nav className={"flex justify-between items-center"}>
        <Link href={"/"}>
          <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>
        <div className="flex items-center justify-center gap-3 xl:gap-5 text-black">
          {session && session?.user ?
            <>
              <Link href={"/startup/create"}>
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 text-primary sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type={"submit"} className=" max:sm:mt-1.5">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 text-red-500 sm:hidden" />
                </button>
              </form>
              <Link href={`/user/${session.id}`}>
                <Avatar className="size-8">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>{session?.user?.name?.charAt(0) || ""}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          : <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
