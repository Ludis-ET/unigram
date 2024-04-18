import { useContext, useState } from "react";
import { usePost } from "../../hooks";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { ShareComponent } from "../../components/utils/Share";

export const AboutPost = ({ post }) => {
  const { user, myprofile } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
  const [loading, setLoading] = useState([false, false, false, false, false]);
  const { upvote, downvote, save, clear, report } = usePost(post, backendUrl);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
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
  const reportCall = async () => {
    if (user) {
      setLoading([false, false, false, false, true]);
      await report();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  let clearButton = false;
  if (myprofile && post.downvote.indexOf(myprofile.id) !== -1) {
    clearButton = true;
  } else if (myprofile && post.upvote.indexOf(myprofile.id) !== -1) {
    clearButton = true;
  } else {
    clearButton = false;
  }

  return (
    <div>
      {isModalOpen && (
        <div
          id="course-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="font-sans overflow-y-auto overflow-x-hidden fixed top-1/2 left-16 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 md:p-5">
                <h3 className="text-lg text-gray-500 dark:text-gray-400">
                  Share Question
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="px-4 pb-4 md:px-5 md:pb-5">
                <label
                  htmlFor="course-url"
                  className="text-sm font-medium text-gray-900 dark:text-white mb-2 block"
                >
                  Share the question link :
                </label>
                <ShareComponent url={`${frontendUrl}question/${post.slug}`} />
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full md:fixed p-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <div className="flex gap-4">
            <h1 className="text-dark-700 dark:text-white">
              {post.upvote.length - post.downvote.length} Votes
            </h1>
            <h1 className="text-dark-700 dark:text-white">
              {post.saves.length} saves
            </h1>
            {clearButton && (
              <span
                onClick={clearCall}
                className="bg-gray-100 cursor-pointer  text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
              >
                {loading[4] ? svg : "clear vote"}
              </span>
            )}
          </div>
          <div className="flex gap-4 mt-4 md:mt-6">
            <button
              type="button"
              onClick={upvoteCall}
              className=" px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading[0] ? (
                svg
              ) : (
                <i className="fa-solid fa-caret-up text-2xl"></i>
              )}
            </button>
            <button
              type="button"
              onClick={downvoteCall}
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {loading[1] ? (
                svg
              ) : (
                <i className="fa-solid fa-caret-down text-2xl"></i>
              )}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading[2] ? (
                svg
              ) : (
                <i
                  onClick={saveCall}
                  className="fa-regular fa-floppy-disk text-2xl"
                ></i>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <i className="fa-regular fa-share-from-square text-2xl"></i>
            </button>
            <button
              type="button"
              onClick={reportCall}
              className="px-4 py-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Report
            </button>
          </div>
        </div>
        {post.video && (
          <div className=" text-dark-700 dark:text-white border-2 mt-4 rounded-md p-2">
            <video className="w-96 rounded-md" controls>
              <source src={post.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            About the question
          </div>
        )}
      </div>
    </div>
  );
};
