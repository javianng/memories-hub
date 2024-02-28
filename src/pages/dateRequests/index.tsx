import PageLayout from "~/components/common/PageLayout";
import DateRequestEnvelope from "~/components/dateRequests/DateRequestEnvelope";
import { api } from "~/utils/api";

export default function Dates() {
  const { data } = api.daterequest.getAll.useQuery();
  return (
    <PageLayout
      title="date requests"
      subtitle="as a highly loved individual, here lies all the date requests from the past from a random guy. may this list grow so long that it takes very long to update this website since it is not supported by a server."
    >
      {data?.map((dateRequest) => (
        <DateRequestEnvelope
          key={dateRequest.idx}
          idx={dateRequest.idx}
          title={dateRequest.title}
          date={dateRequest.date}
          approved={dateRequest.approved}
        />
      ))}
    </PageLayout>
  );
}
