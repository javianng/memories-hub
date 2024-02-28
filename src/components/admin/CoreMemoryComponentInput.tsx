import { useState } from "react";
import { api } from "~/utils/api";

import { BarsArrowUpIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

export default function CoreMemoryComponentInput() {
  const [titleInput, setTitleInput] = useState("");
  const [coreMemoryIdxInput, setCoreMemoryIdxInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const { data } = api.coreMemory.getAll.useQuery();

  const { mutate } =
    api.coreMemoryComponent.createCoreMemoryComponent.useMutation();

  const handleAddCoreMemoryComponent = async () => {
    try {
      mutate({
        title: titleInput,
        description: descriptionInput,
        image: imageInput,
        coreMemoryIdx: coreMemoryIdxInput,
      });
      alert("core memory compoenent added successfully!");
      setTitleInput("");
      setDescriptionInput("");
      setImageInput("");
      setCoreMemoryIdxInput("");
    } catch (error) {
      console.error("error adding core memory compoenent:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">core memory component input</h2>
      <div className="flex flex-col gap-4 rounded-md bg-neutral-200 p-4 shadow-md">
        <label
          htmlFor="title"
          className="input input-bordered flex items-center gap-2 shadow-md"
        >
          <BarsArrowUpIcon className="w-6" />
          <input
            className="grow"
            placeholder="title"
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </label>

        <label
          htmlFor="coreMemoryIdx"
          className="input input-bordered flex items-center gap-2 shadow-md"
        >
          <BarsArrowUpIcon className="w-6" />
          <select
            className="grow"
            value={coreMemoryIdxInput}
            onChange={(e) => setCoreMemoryIdxInput(e.target.value)}
          >
            <option value="">Select Core Memory</option>
            {data?.map((memory) => (
              <option key={memory.idx} value={memory.idx}>
                {memory.title}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="description"
          className="input input-bordered flex items-center gap-2 shadow-md"
        >
          <DocumentTextIcon className="w-6" />
          <input
            type="text"
            className="grow"
            placeholder="description"
            id="description"
            name="description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </label>

        <label
          htmlFor="image"
          className="input input-bordered flex items-center gap-2 shadow-md"
        >
          <BarsArrowUpIcon className="w-6" />
          <input
            className="grow"
            placeholder="image"
            type="text"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
        </label>

        <button className="btn" onClick={handleAddCoreMemoryComponent}>
          add core memory component
        </button>
      </div>
    </div>
  );
}
