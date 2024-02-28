import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { api } from "~/utils/api";
import DateRequestButton from "./DateRequestButton";
import GreyBorder from "../common/GreyBorder";

export default function DateRequestSection() {
  const { data: upcomingData } = api.daterequest.getUpcoming.useQuery();
  const { data: pastTwoData } = api.daterequest.getPastTwo.useQuery();

  return (
    <>
      <h2 className="text-xl font-semibold">date requests</h2>
      <div className="flex gap-3 overflow-scroll pb-3 pt-2">
        {upcomingData?.length === 0 && (
          <div className="btn border-0 bg-white shadow-md hover:cursor-not-allowed hover:bg-rose-50">
            No upcoming dates
          </div>
        )}
        {upcomingData?.map((dateRequest, index) => (
          <DateRequestButton
            key={index}
            idx={dateRequest.idx}
            title={dateRequest.title}
            date={dateRequest.date}
            approved={dateRequest.approved}
          />
        ))}

        <GreyBorder />

        {pastTwoData?.map((dateRequest, index) => (
          <DateRequestButton
            key={index}
            idx={dateRequest.idx}
            title={dateRequest.title}
            date={dateRequest.date}
            approved={dateRequest.approved}
          />
        ))}

        <ViewAllLink />
      </div>
    </>
  );
}

function ViewAllLink() {
  return (
    <Link
      href="/dateRequests"
      className="group flex cursor-pointer items-center gap-1"
    >
      <p className="text-neutral-500 transition duration-200 group-hover:text-black">
        View All
      </p>
      <ChevronRightIcon className="w-6 fill-neutral-500 transition duration-200 group-hover:translate-x-1 group-hover:fill-black" />
    </Link>
  );
}
