import { useState } from "react";
import { api } from "~/utils/api";

import { BarsArrowUpIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

export default function TimelineItemsInput() {
  const [titleInput, setTitleInput] = useState("");
  const [dateRequestIdxInput, setDateRequestIdxInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [logoInput, setLogoInput] = useState("");
  const [datetimeInput, setDatetimeInput] = useState("");

  const { data } = api.daterequest.getAll.useQuery();

  const { mutate } = api.timelineitem.createTimelineItem.useMutation();

  const handleAddTimelineItem = async () => {
    try {
      mutate({
        title: titleInput,
        description: descriptionInput,
        logo: logoInput,
        datetime: new Date(datetimeInput),
        dateRequestIdx: dateRequestIdxInput,
      });
      alert("Timeline item added successfully!");
      setTitleInput("");
      setDescriptionInput("");
      setLogoInput("");
      setDatetimeInput("");
      setDateRequestIdxInput("");
    } catch (error) {
      console.error("Error adding timeline item:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">timeline items input</h2>
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
          htmlFor="dateRequestIdx"
          className="input input-bordered flex items-center gap-2 shadow-md"
        >
          <BarsArrowUpIcon className="w-6" />
          <select
            className="grow"
            value={dateRequestIdxInput}
            onChange={(e) => setDateRequestIdxInput(e.target.value)}
          >
            <option value="">Select Date Request</option>
            {data?.map((request) => (
              <option key={request.idx} value={request.idx}>
                {request.title}
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
          htmlFor="logo"
          className="input input-bordered flex items-center gap-2 shadow-md"
        >
          <BarsArrowUpIcon className="w-6" />
          <input
            className="grow"
            placeholder="logo"
            type="text"
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
          />
        </label>

        <div className="flex items-center gap-2 py-2">
          <input
            type="datetime-local"
            name="date"
            value={datetimeInput}
            className="w-full rounded-md p-2 text-center text-neutral-400 shadow-md"
            onChange={(e) => setDatetimeInput(e.target.value)}
          />
        </div>

        <button className="btn" onClick={() => undefined}>
          {/* <button className="btn" onClick={handleAddTimelineItem}> */}
          add timeline item
        </button>
      </div>
    </div>
  );
}
