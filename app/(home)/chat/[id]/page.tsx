"use client";

import { ResizableChat } from "@/components/extra/resizeable-bar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Chat() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session?.user?.id) {
    router.push("/login");
    toast("Login to generate story");
  }
  return (
    <div className="" style={{ height: "calc(100vh - 69px)" }}>
      <ResizableChat />
    </div>
  );
}
