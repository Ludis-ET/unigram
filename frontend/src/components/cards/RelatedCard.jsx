import React, { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const RelatedCard = ({ data }) => {
  const { user, myprofile } = useContext(AuthContext);
  const [more, setMore] = useState(false);
  const addedDate = new Date(data.added_time);
  const timeAgo = formatDistanceToNow(addedDate, { addSuffix: true });
  const navigate = useNavigate();
  const [loading, setLoading] = useState([false, false, false, false, false]);
  const { upvote, downvote, save, clear } = usePost(data, backendUrl);
  const svg = (
    <svg
      aria-hidden="true"
      className="w-5 h-7 text-gray-200 animate-spin dark:text-white fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  const upvoteCall = async () => {
    if (user) {
      setLoading([true, false, false, false, false]);
      await upvote();
      setLoading([false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const downvoteCall = async () => {
    if (user) {
      setLoading([false, true, false, false, false]);
      await downvote();
      setLoading([false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const saveCall = async () => {
    if (user) {
      setLoading([false, false, true, false, false]);
      await save();
      setLoading([false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const clearCall = async () => {
    if (user) {
      setLoading([false, false, false, false, true]);
      await clear();
      setLoading([false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const report = () => {
    setLoading([false, false, false, true, false]);
    if (user) {
    } else {
      navigate("/login");
    }
  };
  const handleShare = async (event) => {};
  let mainclass = "";
  let clearButton = false;
  if (myprofile && data.downvote.indexOf(myprofile.id) !== -1) {
    mainclass =
      "mt-5 max-w-xs flex flex-col bg-white border border-t-4 border-t-red-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-red-500 dark:shadow-slate-700/[.7]       min-w-full hover:bg-gray-100 dark:hover:bg-gray-700";
    clearButton = true;
  } else if (myprofile && data.upvote.indexOf(myprofile.id) !== -1) {
    mainclass =
      "mt-5 max-w-xs flex flex-col bg-white border border-t-4 border-t-green-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-green-500 dark:shadow-slate-700/[.7]       min-w-full hover:bg-gray-100 dark:hover:bg-gray-700";
    clearButton = true;
  } else {
    mainclass =
      "mt-5 max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]       min-w-full hover:bg-gray-100 dark:hover:bg-gray-700";
    clearButton = false;
  }
  return (
    <div>
      <div className={mainclass}>
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex flex-wrap justify-center text-center items-center gap-2">
            <Link to={`/question/${data.slug}`}>{data.name}</Link>
            {clearButton && (
              <span
                onClick={clearCall}
                className="bg-gray-100 cursor-pointer  text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
              >
                {loading[4] ? svg : "clear vote"}
              </span>
            )}
          </h3>
          <div className="flex gap-3 justify-center items-center p-2">
            <div className="flex flex-row items-center text-center justify-center dark:text-white">
              <button
                type="button"
                onClick={upvoteCall}
                className="text-white p-0  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg px-3  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {loading[0] ? (
                  svg
                ) : (
                  <i className="fa-solid fa-caret-up text-2xl"></i>
                )}
              </button>
              <b className="pr-2 pd-2">
                {data.upvote.length - data.downvote.length}
              </b>
              <button
                type="button"
                onClick={downvoteCall}
                className="text-white p-0  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {loading[1] ? (
                  svg
                ) : (
                  <i className="fa-solid fa-caret-down text-2xl"></i>
                )}
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center px-6">
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <div className="grid gap-4 grid-cols-2 w-60 my-2.5">
                  {data.images.length > 0 && (
                    <div className="group relative">
                      <button className="absolute w-full h-full bg-gray-900/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-medium text-white">
                          +{data.images.length}
                        </span>
                        <div
                          id="download-image"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Download image
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                      </button>
                      <img
                        src="https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg"
                        className="rounded-lg"
                      />
                    </div>
                  )}

                  {data.video && (
                    <div className="group relative">
                      <button className="absolute w-full h-full bg-gray-900/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-medium text-white">
                          <i className="fa-solid fa-video"></i>
                        </span>
                        <div
                          id="download-image"
                          role="tooltip"
                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                          Download image
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                      </button>
                      <img
                        src="https://i.pinimg.com/736x/2c/c5/16/2cc5167ba9a3df40294330225292005e.jpg"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
