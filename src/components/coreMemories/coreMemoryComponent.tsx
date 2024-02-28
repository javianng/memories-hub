import { UseFirebaseImage } from "../common/UseFirebaseImage";

export default function CoreMemoryComponent({
  imageUrl,
  heading,
  paragraph,
}: MemoryItem) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="sm:w-1/3">
        <img
          src={UseFirebaseImage(imageUrl)}
          alt={heading}
        />
      </div>
      <div className="flex flex-col gap-2 sm:w-2/3">
        <h2 className="text-lg font-semibold">{heading}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  );
}

type MemoryItem = {
  imageUrl: string;
  heading: string;
  paragraph: string;
};
