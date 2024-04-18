import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useFile } from "../../hooks";
import { AuthContext } from "../../context";
import logo from "../../assets/logo.png";

export const FileCard = ({ file }) => {
  const { myprofile } = useContext(AuthContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState([false, false, false, false, false]);
  const { upvote, downvote, save, clear, download, report } = useFile(
    file,
    backendUrl
  );
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
    if (myprofile) {
      setLoading([true, false, false, false, false, false]);
      await upvote();
      setLoading([false, false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const downvoteCall = async () => {
    if (myprofile) {
      setLoading([false, true, false, false, false, false]);
      await downvote();
      setLoading([false, false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const saveCall = async () => {
    if (myprofile) {
      setLoading([false, false, true, false, false, false]);
      await save();
      setLoading([false, false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const clearCall = async () => {
    if (myprofile) {
      setLoading([false, false, false, true, false, false]);
      await clear();
      setLoading([false, false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const downloadCall = async () => {
    if (myprofile) {
      setLoading([false, false, false, false, true, false]);
      await download();
      setLoading([false, false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };
  const reportCall = async () => {
    if (myprofile) {
      setLoading([false, false, false, false, false, true]);
      await report();
      setLoading([false, false, false, false, false, false]);
    } else {
      navigate("/login");
    }
  };

  let mainclass = "";
  let clearButton = false;
  if (
    myprofile &&
    file.downvotes &&
    file.downvotes.indexOf(myprofile.id) !== -1
  ) {
    mainclass =
      "max-w-[700px] px-10 my-4 py-6 border-t-2 border-red-600 dark:bg-gray-900 dark:text-white bg-white rounded-lg shadow-md";
    clearButton = true;
  } else if (
    myprofile &&
    file.upvotes &&
    file.upvotes.indexOf(myprofile.id) !== -1
  ) {
    mainclass =
      "max-w-[700px] px-10 my-4 py-6 border-t-2 border-green-600 dark:bg-gray-900 dark:text-white bg-white rounded-lg shadow-md";
    clearButton = true;
  } else {
    mainclass =
      "max-w-[700px] px-10 my-4 py-6 dark:bg-gray-900 dark:text-white bg-white rounded-lg shadow-md";
    clearButton = false;
  }
  return (
    <div>
      <div className={mainclass}>
        <div className="flex justify-between items-center">
          <span className="font-light dark:text-white text-gray-600">
            {/* {formatDistanceToNow(new Date(file.created_at), {
              addSuffix: true,
            })} */}
          </span>
          {clearButton && (
            <span
              onClick={clearCall}
              className="bg-gray-100 cursor-pointer  text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
            >
              {loading[3] ? svg : "clear vote"}
            </span>
          )}
          <button
            type="button"
            className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
            onClick={reportCall}
          >
            {loading[5] ? svg : "Report "}
          </button>
        </div>
        <div className="mt-2">
          <a
            className="text-2xl text-gray-700 dark:text-white font-bold hover:text-gray-600"
            href="#"
          >
            {file.name}
          </a>
          <div className="flex flex-wrap gap-2 p-2">
            {file.tag &&
              file.tag.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 items-center">
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
            <b>
              {file.upvotes && file.downvotes
                ? file.upvotes.length - file.downvotes.length
                : 0}
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
            {loading[2] ? (
              svg
            ) : (
              <i
                onClick={saveCall}
                className="fa-regular fa-floppy-disk cursor-pointer text-2xl dark:text-white text-gray-950 relative focus:outline-none font-medium rounded-lg text-center me-2 mb-2"
              >
                {file.saves && file.saves.length > 0 && (
                  <span className="absolute top-[-6px] right-[-16px] -mt-2 -ml-2">
                    <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                      {file.saves.length}
                    </div>
                  </span>
                )}
              </i>
            )}
            <button
              type="button"
              onClick={downloadCall}
              className="text-white flex items-center px-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {loading[4] ? (
                svg
              ) : (
                <>
                  <span className="material-symbols-outlined text-4xl">
                    download
                  </span>
                  <b className="text-xl">
                    {file.downloads ? file.downloads.length : 0}
                  </b>
                </>
              )}
            </button>
          </div>
          <div>
            <Link
              to={`/${file.author.user_info.username}`}
              className="flex items-center"
              href="#"
            >
              <img
                className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                src={file.author.profile_pic ? file.author.profile_pic : logo}
                alt="avatar"
              />
              <h1 className="text-gray-700 font-bold">
                {file.author.user_info.first_name}{" "}
                {file.author.user_info.last_name}
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
