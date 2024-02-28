import PageLayout from "~/components/common/PageLayout";
import DateRequestEnvelope from "~/components/dateRequests/DateRequestEnvelope";
import { api } from "~/utils/api";

export default function Dates() {
  const { data } = api.daterequest.getAll.useQuery();
  return (
    <PageLayout
      title="date requests"
      subtitle="Aliquip est quis do. Anim eu enim magna adipisicing. Consequat sint voluptate excepteur ex do pariatur ad aliquip deserunt eiusmod proident. Aliqua aliquip irure do eiusmod nostrud consectetur elit exercitation mollit nostrud laboris ullamco ipsum. Labore ad est sit elit non nostrud officia esse occaecat minim amet."
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
