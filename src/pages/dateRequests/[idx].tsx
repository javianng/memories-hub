import { useRouter } from "next/router";
import PageLayout from "~/components/common/PageLayout";
import TimelineComponent from "~/components/dateRequests/TimelineComponent";
import { api } from "~/utils/api";

export default function DateRequest() {
  const router = useRouter();
  const { idx } = router.query;
  const { data } = api.daterequest.readByTitle.useQuery(
    {
      idx: idx as string,
    },
    {
      enabled: router.isReady,
    },
  );

  const approveDateRequestMutation =
    api.daterequest.approveDateRequest.useMutation();

  const handleApproveDateRequest = async () => {
    try {
      approveDateRequestMutation.mutate({
        idx: idx as string,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout
      title={data?.title ?? "loading date request"}
      subtitle={data?.description ?? "loading description of date request"}
    >
      {data && <TimelineComponent items={data?.timelineitems} />}

      <div className="flex justify-center gap-4">
        <button className="btn w-fit" onClick={handleApproveDateRequest}>
          yes 👍🏻
        </button>
        <a href="#no_modal" className="btn">
          no 👎🏻
        </a>
        <div className="modal" role="dialog" id="no_modal">
          <div className="modal-box">
            <p>
              it is illegal to reject a date and since i coded this out, my
              rules only 😈
            </p>
            <div className="modal-action">
              <a href="#" className="btn">
                go back
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
