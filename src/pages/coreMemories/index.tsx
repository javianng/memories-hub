import Link from "next/link";
import { api } from "~/utils/api";
import { UseFirebaseImage } from "~/components/common/UseFirebaseImage";
import PageLayout from "~/components/common/PageLayout";

type CoreMemory = {
  idx: string;
  title: string | null;
  subtitle: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  CoreMemoryComponent: CoreMemoryComponent[];
};

type CoreMemoryComponent = {
  idx: string;
  title: string | null;
  description: string | null;
  image: string | null;
  coreMemoryIdx: string | null;
};

type MemoryLinkProps = {
  memory: CoreMemory;
};

export default function CoreMemoriesSection() {
  const { data } = api.coreMemory.getAll.useQuery();
  return (
    <PageLayout
      title="core memories"
      subtitle="Proident eiusmod do fugiat aliqua dolor velit ipsum proident. Aliqua eiusmod adipisicing proident et. Dolore nisi velit nisi aliqua mollit quis laborum. Esse id dolor aliqua commodo velit duis incididunt ad. Exercitation nostrud tempor do reprehenderit ullamco esse dolor esse. Cillum laborum veniam cillum qui dolore quis laboris. Aute irure proident adipisicing id officia."
    >
      <div className="flex w-full flex-col gap-4">
        {data?.map((coreMemory, index) => (
          <div key={coreMemory.idx}>
            <div className="group h-fit w-full">
              <div className="flex flex-col gap-2 pb-6">
                <h2 className="text-xl font-semibold">{coreMemory.title}</h2>
                <p className="font-extralight">{coreMemory.subtitle}</p>
                <div className=" w-full overflow-scroll">
                  <Link
                    href={`/coreMemories/${coreMemory.idx}`}
                    className="flex w-fit "
                  >
                    <MemoryLink key={index} memory={coreMemory} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

function MemoryLink({ memory }: MemoryLinkProps) {
  const renderMultipleImages = (images: (string | null)[]): React.ReactNode => {
    const placeholderImage = "/images/placeholder.png";
    return (
      <div className="flex h-fit w-fit flex-row gap-4 bg-black p-4">
        {images.map((image, i) => (
          <div key={i}>
            <div className="grid grid-flow-col">
              {Array<number>(4)
                .fill(0)
                .map((_, j: number) => (
                  <div
                    key={j}
                    className="h-4 w-4 bg-white transition duration-200 group-hover:bg-yellow-200"
                  />
                ))}
            </div>
            <div className="py-2">
              <div className="relative h-full w-60">
                <img
                  src={
                    image && image !== placeholderImage
                      ? UseFirebaseImage(image)
                      : placeholderImage
                  }
                  alt=""
                  className="h-80 items-center object-cover"
                />
              </div>
            </div>
            <div className="grid grid-flow-col ">
              {Array<number>(4)
                .fill(0)
                .map((_, j: number) => (
                  <div
                    key={j}
                    className="h-4 w-4 bg-white transition duration-200 group-hover:bg-yellow-200"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderMultipleImages(
        memory.CoreMemoryComponent.map((item) => item.image ?? ""),
      )}
    </>
  );
}
