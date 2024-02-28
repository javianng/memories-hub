import PageLayout from "~/components/common/PageLayout";
import DateRequestsInput from "~/components/admin/DateRequestsInput";
import TimelineItemsInput from "~/components/admin/TimelineItemsInput";
import CoreMemoriesInput from "~/components/admin/CoreMemoriesInput";
import CoreMemoryComponentInput from "~/components/admin/CoreMemoryComponentInput";

export default function Admin() {
  return (
    <PageLayout
      title="Admin Portal"
      subtitle="I know this isn't protected but unless you know how to code or you peeked at me coding, you wouldn't find this... right?"
    >
      <div className="flex flex-col gap-4 pb-10">
        <DateRequestsInput />
        <div className="h-4" />
        <TimelineItemsInput />
        <div className="h-4" />
        <CoreMemoriesInput />
        <div className="h-4" />
        <CoreMemoryComponentInput />
      </div>
    </PageLayout>
  );
}
