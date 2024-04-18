import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import { formatDistanceToNow } from "date-fns";
import { AuthContext } from "../../context";
import { AddComment } from "../utils/AddComment";
import { useComment } from "../../hooks";

export const CommentCard = ({ comment, post }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [modal, setModal] = useState(false);
  const [full, setFull] = useState(false);
  const [rep, setRep] = useState(false);
  const [deleting, setDeleting] = useState(false); // Add deleting state
  const { deleteComment } = useComment(post, backendUrl);
  const { myprofile } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      setDeleting(true); // Set deleting state to true
      await deleteComment(comment.id);
      setDeleting(false); // Reset deleting state after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
      setDeleting(false); // Reset deleting state in case of error
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 py-6 max-w-[700px] dark:border-white border-gray-700 border-l-4 pl-6 sm:flex-row sm:items-start sm:gap-2.5">
        <div className="flex flex-col items-center text-center justify-center dark:text-white">
          <button
            type="button"
            className="text-white p-0 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg px-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <i className="fa-solid fa-caret-up text-2xl"></i>
          </button>
          <b className="pr-2 pd-2">0</b>
          <button
            type="button"
            className="text-white p-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <i className="fa-solid fa-caret-down text-2xl"></i>
          </button>
        </div>
        <img
          className="h-8 w-8 rounded-full"
          onMouseOut={() => setModal(false)}
          onMouseOver={() => setModal(true)}
          src={comment.author.profile_pic ? comment.author.profile_pic : logo}
          alt="User Profile"
        />
        {modal && (
          <div
            data-popover
            id="popover-user-profile"
            role="tooltip"
            className="absolute z-0 mt-[-150px] ml-12 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <a href="#">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      comment.author.profile_pic
                        ? comment.author.profile_pic
                        : logo
                    }
                    alt="User Profile"
                  />
                </a>
                <div></div>
              </div>
              <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a href="#">
                  {comment.author.user.first_name}{" "}
                  {comment.author.user.last_name}
                </a>
              </p>
              <p className="mb-3 text-sm font-normal">
                <a href="#" className="hover:underline">
                  @{comment.author.user.username}
                </a>
              </p>
              <ul className="flex text-sm">
                <li className="me-2">
                  <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.upvote.length - comment.downvote.length}
                    </span>
                    <span>Votes</span>
                  </a>
                </li>
              </ul>
            </div>
            <div data-popper-arrow></div>
          </div>
        )}
        <div className="flex flex-col gap-2.5 w-full relative">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {comment.content}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex gap-8">
            <span
              onClick={() => setRep(!rep)}
              className="text-sm cursor-pointer font-normal text-gray-500 dark:text-gray-400"
            >
              Reply
            </span>
            {myprofile && comment.author.id === myprofile.id && (
              <span
                onClick={handleDelete}
                className="text-sm cursor-pointer font-normal text-gray-500 dark:text-gray-400"
              >
                {deleting ? "Deleting..." : "Delete"}
              </span>
            )}
            {comment.replies.length > 0 && (
              <span
                onClick={() => setFull(!full)}
                className="text-sm cursor-pointer font-normal text-gray-500 dark:text-gray-400"
              >
                {full ? "Collapse" : "Expand"}
              </span>
            )}
          </div>
        </div>
        <svg
          className="absolute left-0 h-full w-1 text-gray-600 dark:text-gray-400"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 0 L100 50 L0 100" fill="none" />
        </svg>
      </div>
      {rep && (
        <div className="m-4">
          <AddComment id={post} parentComment={comment.id} />{" "}
          {/* Pass parentComment prop */}
        </div>
      )}

      {full && comment && comment.replies && (
        <div className="ml-8">
          {comment.replies.map((reply, index) => (
            <CommentCard comment={reply} post={post} key={index} />
          ))}
        </div>
      )}
    </>
  );
};
