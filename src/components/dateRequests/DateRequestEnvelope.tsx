import {
  HeartIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

type DateRequestEnvelopeType = {
  idx: string;
  title: string | null;
  date: Date;
  approved: boolean;
};

export default function DateRequestEnvelope({
  idx,
  title,
  date,
  approved,
}: DateRequestEnvelopeType) {
  return (
    <div>
      {/* Small Screen */}

      <Link
        className="group btn flex h-fit w-full border-0 bg-white shadow-lg hover:bg-rose-50 sm:hidden"
        href={`/dateRequests/${idx}`}
      >
        <div className="flex flex-col items-center gap-4 py-5">
          <div>
            {approved && <EnvelopeOpenIcon className="w-6 fill-rose-400" />}
            {!approved && (
              <div className="group">
                <EnvelopeIcon className="flex w-6 fill-rose-400 transition group-hover:hidden" />
                <EnvelopeOpenIcon className="hidden w-6 fill-rose-400 group-hover:flex" />
              </div>
            )}
          </div>
          <p>{title}</p>
          <p>{`${date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }).replace(/(\d+) (\w+) (\d+)/, "$2 $1 $3")}`}</p>
        </div>
      </Link>

      {/* Large Screen */}

      <Link
        className="group btn hidden justify-between border-0 bg-white shadow-md hover:bg-rose-50 sm:flex"
        href={`/dateRequests/${idx}`}
      >
        <div className="flex items-center gap-3">
          {approved && <EnvelopeOpenIcon className="w-6 fill-rose-400" />}
          {!approved && (
            <div className="group">
              <EnvelopeIcon className="flex w-6 fill-rose-400 transition group-hover:hidden" />
              <EnvelopeOpenIcon className="hidden w-6 fill-rose-400 group-hover:flex" />
            </div>
          )}
        </div>
        <p>{title}</p>
        <p>{`${date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }).replace(/(\d+) (\w+) (\d+)/, "$2 $1 $3")}`}</p>
        <div className="rounded-md bg-neutral-100 p-1">
          <HeartIcon className="w-6 fill-rose-400" />
        </div>
      </Link>
    </div>
  );
}
