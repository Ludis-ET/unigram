import { LeftBar } from "../Home";
import { ProfileLoading, HashtagCard, HashCard } from "../../components";
import { useProfile } from "../../hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import nodata from "../../assets/404_!.svg";
import { useHashtags } from "../../hooks";

export const Hashtag = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { username } = useParams();
  const [not, setNot] = useState(false);
  const { profiles } = useHashtags(backendUrl);
  console.log(profiles);

  return (
    <div>
      <LeftBar />
      <div className="md:ml-[280px] mx-8">
        <header>
          <div className="w-full flex flex-wrap gap-8">
            {!profiles
              ? [1, 2, 3, 4, 5, 6, 7, 8, 910, 11, 12, 13, 14, 15, 16].map(
                  (_, index) => (
                    <div
                      key={index}
                      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3 material-symbols-outlined">
                        tag
                      </span>
                      <div className="mb-2 w-20 h-6 bg-gray-900 dark:bg-white animate-pulse"></div>
                      <div className="mb-3 flex justify-between gap-8 animate-pulse">
                        <div className="w-12 h-3 bg-gray-500 dark:bg-gray-400"></div>
                        <div className="w-12 h-3 bg-gray-500 dark:bg-gray-400"></div>
                      </div>
                      <button
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 animate-pulse"
                      ></button>
                    </div>
                  )
                )
              : profiles.map((p, index) => <HashCard key={index} h={p} />)}
          </div>
        </header>
      </div>
    </div>
  );
};
