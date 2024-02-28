import { HomeIcon, InboxIcon, HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AppBar() {
  return (
    <div className="fixed bottom-3 left-0 w-full">
      <div className="flex justify-center">
        <div className="flex max-w-xl gap-6 rounded-xl bg-neutral-950 px-6 py-3 shadow-xl">
          <IconButton address="/dateRequests">
            <InboxIcon className="w-6 fill-neutral-400 transition duration-150 group-hover:fill-neutral-100" />
          </IconButton>
          <IconButton address="/">
            <HomeIcon className="w-6 fill-neutral-400 transition duration-150 group-hover:fill-neutral-100" />
          </IconButton>
          <IconButton address="/coreMemories">
            <HeartIcon className="w-6 fill-neutral-400 transition duration-150 group-hover:fill-neutral-100" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

type IconButtonProps = {
  children: ReactNode;
  address?: string;
};

function IconButton({ children, address }: IconButtonProps) {
  return (
    <Link href={address ?? ""}>
      <div className="py-x group group btn rounded-xl border-0 bg-transparent duration-150 hover:bg-neutral-800">
        {children}
      </div>
    </Link>
  );
}
