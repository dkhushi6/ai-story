"use client";

import { HoverCard } from "@radix-ui/react-hover-card";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme/theme-switcher";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 py-4 border-b shadow-sm bg-white dark:bg-black flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-wide">
        AI-STORY
      </Link>
      <div className="flex gap-5">
        <div>
          {" "}
          <ThemeSwitcher />
        </div>
        <div className="flex items-center gap-4">
          {session?.user?.id ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <Image
                    src={session.user.image ?? "/avatar-placeholder.png"}
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full border"
                  />
                </Button>
              </HoverCardTrigger>

              <HoverCardContent className="w-64 p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={session.user.image ?? "/avatar-placeholder.png"}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{session.user.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Log out
                </Button>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
