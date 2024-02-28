import { useState } from "react";
import { api } from "~/utils/api";

import { BarsArrowUpIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

export default function CoreMemoriesInput() {
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [subtitleInput, setSubtitleInput] = useState("");

  const { mutate } = api.coreMemory.createCoreMemory.useMutation();

  const handleAddDateRequest = async () => {
    try {
      mutate({
        title: titleInput,
        date: new Date(dateInput),
        subtitle: subtitleInput,
      });
      alert("core memory added successfully!");
      setTitleInput("");
      setDateInput("");
      setSubtitleInput("");
    } catch (error) {
      console.error("Error adding core memory:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">core memories input</h2>
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
        <div className="flex items-center gap-2 py-2">
          <input
            type="date"
            name="date"
            value={dateInput}
            className="w-full rounded-md p-2 text-center text-neutral-400 shadow-md"
            onChange={(e) => setDateInput(e.target.value)}
          />
        </div>
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
            value={subtitleInput}
            onChange={(e) => setSubtitleInput(e.target.value)}
          />
        </label>
        <button className="btn" onClick={handleAddDateRequest}>
          add core memory
        </button>
      </div>
    </div>
  );
}
