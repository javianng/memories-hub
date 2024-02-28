import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type DateRequestButtonType = {
  idx: string;
  title: string | null;
  date: Date;
  approved: boolean;
};

export default function DateRequestButton({
  idx,
  title,
  date,
  approved,
}: DateRequestButtonType) {
  return (
    <>
      <Link
        className="btn border-0 bg-white shadow-md hover:bg-rose-50"
        href={`/dateRequests/${idx}`}
      >
        <div className="rounded-md bg-neutral-100 p-1">
          <HeartIcon className="w-6 fill-rose-400" />
        </div>
        <p>{`${title} on ${date.toLocaleDateString("en-US", { day: "2-digit", month: "long" })}`}</p>
      </Link>
      {!approved && (
        <span className="relative -left-5 bottom-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
        </span>
      )}
    </>
  );
}
