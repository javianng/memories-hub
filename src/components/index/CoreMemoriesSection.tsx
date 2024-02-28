import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";

import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { UseFirebaseImage } from "../common/UseFirebaseImage";

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

export default function CoreMemoriesSection() {
  const { data } = api.coreMemory.getFour.useQuery();

  const firebaseApp = getApp();
  getStorage(firebaseApp);

  return (
    <>
      <h2 className="text-xl font-semibold">core memories</h2>
      <div className="flex flex-row flex-wrap items-end gap-4 pb-4">
        {data?.map((coreMemory, index) => (
          <MemoryLink key={index} memory={coreMemory} />
        ))}
        <Link
          className="group flex h-fit cursor-pointer gap-1"
          href="/coreMemories"
        >
          <p className="text-neutral-500 transition duration-200 group-hover:text-black">
            view all
          </p>
          <ChevronRightIcon className="w-6 fill-neutral-500 transition duration-200 group-hover:translate-x-1 group-hover:fill-black" />
        </Link>
      </div>
    </>
  );
}

type MemoryLinkProps = {
  memory: CoreMemory;
};

function MemoryLink({ memory }: MemoryLinkProps) {
  const renderSingleImage = (coreMemoryComponent: CoreMemoryComponent) => (
    <div className="aspect-square overflow-hidden rounded-xl">
      <img
        src={
          coreMemoryComponent.image
            ? UseFirebaseImage(coreMemoryComponent.image)
            : "/images/placeholder.png"
        }
        alt={coreMemoryComponent.title ?? ""}
        className="aspect-square items-center object-cover"
      />
    </div>
  );

  const renderMultipleImages = (images: (string | null)[]): React.ReactNode => {
    const placeholderImage = "/images/placeholder.png";
    const displayedImages = images.slice(0, Math.min(images.length, 4));
    const imagesToRender: (string | null)[] = [
      ...displayedImages,
      ...(Array.from({ length: 4 - displayedImages.length }).fill(
        placeholderImage,
      ) as (string | null)[]),
    ];

    return (
      <div className="overflow-hidden rounded-xl">
        <div className="grid grid-cols-2 bg-neutral-100">
          {imagesToRender.map((image, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={
                  image && image !== "/images/placeholder.png"
                    ? UseFirebaseImage(image)
                    : placeholderImage
                }
                alt=""
                className="aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Link
      className="w-64 min-w-64 rounded-xl bg-white p-2 shadow-md transition duration-200 hover:bg-pink-100"
      href={`/coreMemories/${memory.idx}`}
    >
      {memory.CoreMemoryComponent.length === 1 && memory.CoreMemoryComponent[0]
        ? renderSingleImage(memory.CoreMemoryComponent[0])
        : renderMultipleImages(
            memory.CoreMemoryComponent.map((item) => item.image ?? ""),
          )}
      <div className="py-2">
        <h3 className="line-clamp-1 font-semibold">{memory.title}</h3>
        <p className="line-clamp-1 font-light">{memory.subtitle}</p>
      </div>
    </Link>
  );
}
