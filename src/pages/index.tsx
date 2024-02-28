import PageLayout from "~/components/common/PageLayout";
import CoreMemoriesSection from "~/components/index/CoreMemoriesSection";
import DateRequestSection from "~/components/index/DateRequestSection";

export default function Home() {
  return (
    <PageLayout
      title={
        <span>
          welcome to the <br /> dashboard of{" "}
          <span className="capitalize underline underline-offset-4">
            MemoriesHub
          </span>
          !
        </span>
      }
      subtitle="Voluptate ad laborum quis id ullamco. Aliqua enim aliquip laborum. Cillum labore minim dolor duis commodo qui ex officia dolore cupidatat. Ullamco laboris officia excepteur veniam sit do laboris esse sit duis est. Ea do enim fugiat cupidatat magna sint aute quis elit do. Sunt proident est consectetur sunt ipsum laboris ex elit pariatur voluptate consectetur. Dolore velit qui reprehenderit commodo veniam qui dolor cillum excepteur Lorem eu excepteur voluptate id."
    >
      <div className="flex flex-col gap-4">
        <DateRequestSection />
        <CoreMemoriesSection />
      </div>
    </PageLayout>
  );
}
0;
