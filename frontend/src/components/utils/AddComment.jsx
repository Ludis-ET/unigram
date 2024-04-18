import React, { useState } from "react";
import { useComment } from "../../hooks";
import { ButtonLoading } from "../loading/ButtonLoading";

export const AddComment = ({ id, comment: parentComment = null }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { add, reply } = useComment(id, backendUrl); // This line fetches the `add` and `reply` functions from the `useComment` hook
  const [load, setLoad] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoad(true);
    if (parentComment !== null) {
      await reply(content, parentComment); // This is where the `reply` function is called
    } else {
      await add(content); // This is where the `add` function is called
    }
    setLoad(false);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600"></div>
          </div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <label htmlFor="editor" className="sr-only">
              Publish Answer
            </label>
            <textarea
              id="editor"
              rows="8"
              className="block w-full outline-none px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write your answer..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          disabled={load}
        >
          {load ? <ButtonLoading text="Publishing " /> : "Publish Answer"}
        </button>
      </form>
    </div>
  );
};
