import { api } from "~/utils/api";
import { useRouter } from "next/router";
import PageLayout from "~/components/common/PageLayout";
import CoreMemoryComponent from "~/components/coreMemories/coreMemoryComponent";

export default function CoreMemory() {
  const router = useRouter();
  const { idx } = router.query;
  const { data } = api.coreMemory.readByTitle.useQuery(
    {
      idx: idx as string,
    },
    {
      enabled: router.isReady,
    },
  );

  return (
    <PageLayout
      title={data?.title ?? "loading core memory"}
      subtitle={data?.subtitle ?? "loading description of core memory"}
    >
      {data?.CoreMemoryComponent?.map((component, idx) => (
        <CoreMemoryComponent
          key={idx}
          imageUrl={component?.image ?? "/images/placeholder.png"}
          heading={component?.title ?? "test"}
          paragraph={component?.description ?? "test"}
        />
      ))}
    </PageLayout>
  );
}
