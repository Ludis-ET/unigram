import { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.png";
import nodata from "../../assets/nodata.svg";
import { HashCard } from "./HashCard";
import { QuestionCard } from "../loading/QuestionCard";
import { FeedCard } from "./FeedCard";
import { useFetchPosts } from "../../hooks";
import { AuthContext } from "../../context";
import { FileCard } from "./FileCard";
import { FileLoading } from "../loading/FileLoading";

export const ProfileCard = ({ profile, rank }) => {
  const [ques, setQues] = useState([false, true, false, false]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const no =
    "py-5 mr-1 sm:mr-3 lg:mr-10 dark:text-white transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary";
  const yes =
    "py-5 mr-1 sm:mr-3 lg:mr-10 dark:text-white transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-assignments]:border-primary group-[.active-assignments]:text-primary text-muted hover:border-primary";
  const p = profile;
  const { myprofile } = useContext(AuthContext);
  const [url, setUrl] = useState(`${backendUrl}api/profiles/${p.id}/posts/`);
  const {
    data: posts,
    loading,
    hasMoreData,
    setData,
    loadMore,
    setLoading,
  } = useFetchPosts(url);

  const handleLoadMore = () => {
    loadMore();
  };

  const third = () => {
    setSortedPosts([]);
    setLoading(true);
    setUrl(`${backendUrl}api/profiles/${p.id}/posts/`);
    setQues([false, false, true, false]);
    setLoading(false);
  };
  const first = () => {
    setSortedPosts([]);
    setLoading(true);
    setUrl(`${backendUrl}api/profiles/${p.id}/saved-posts/`);
    setQues([true, false, false, false]);
    setLoading(false);
  };
  const fourth = () => {
    setSortedPosts([]);
    setLoading(true);
    setUrl(`${backendUrl}api/profiles/${p.id}/saved-files/`);
    setQues([false, false, false, true]);
    setLoading(false);
  };
  const second = () => {
    setQues([false, true, false, false]);
    
  };

  useEffect(() => {
    if (posts.length > 0) {
      // Sort the posts based on the difference between upvotes and downvotes
      if (ques[0] && !ques[1] && !ques[2] && !ques[3]) {
        const sorted = [...posts].sort((a, b) => {
          const scoreA = a.upvote.length - a.downvote.length;
          const scoreB = b.upvote.length - b.downvote.length;
          return scoreB - scoreA;
        });
        setSortedPosts(sorted);
      }
      setSortedPosts(posts);
    }
  }, [url]);

  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
        <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
          <div className="flex flex-wrap mb-6 xl:flex-nowrap">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <img
                  className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  src={p.profile_pic ? p.profile_pic : logo}
                  alt="image"
                />
                <div className="group/tooltip relative">
                  <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white"></span>
                  <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block">
                    {" "}
                    Status: Active{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-wrap items-start justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <a
                      className="text-secondary-inverse dark:text-white hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                      href="javascript:void(0)"
                    >
                      {" "}
                      {p.user_info.first_name} {p.user_info.last_name}{" "}
                    </a>
                  </div>
                  <div className="flex flex-wrap pr-2 mb-4 font-medium">
                    <a
                      className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary dark:text-white"
                      href="javascript:void(0)"
                    >
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>{" "}
                      Rank: {rank + 1}{" "}
                    </a>
                    <a
                      className="flex items-center mb-2 mr-5 text-secondary-dark dark:text-white hover:text-primary"
                      href={`mailto:${p.user_info.email}`}
                      target="_blank"
                    >
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </span>{" "}
                      {p.user_info.email}{" "}
                    </a>
                  </div>
                  <p className="dark:text-white">{p.bio}</p>
                </div>
                {/* <div className="flex flex-wrap my-auto">
                <a
                  href="javascript:void(0)"
                  className="inline-block px-6 py-3 mr-3 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl text-muted bg-light border-light hover:bg-light-dark active:bg-light-dark focus:bg-light-dark "
                >
                  {" "}
                  Follow{" "}
                </a>
                <a
                  href="javascript:void(0)"
                  className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-primary hover:bg-primary-dark active:bg-primary-dark focus:bg-primary-dark "
                >
                  {" "}
                  Hire{" "}
                </a>
              </div> */}
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap items-center">
                  <a
                    href="javascript:void(0)"
                    className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                  >
                    {" "}
                    {p.net_vote} Votes{" "}
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                  >
                    {" "}
                    @{p.user_info.username}{" "}
                  </a>
                  {myprofile && myprofile.id === p.id && (
                    <a
                      href="javascript:void(0)"
                      className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                    >
                      {" "}
                      {p.net_points} Points{" "}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full h-px border-neutral-200" />
          <ul
            nav-tabs
            className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments"
          >
            <li className="flex mt-2 -mb-[2px]">
              <button
                type="button"
                onClick={first}
                aria-controls="summary"
                className={ques[0] ? yes : no}
                href="javascript:void(0)"
              >
                {" "}
                Questions{" "}
              </button>
            </li>
            <li className="flex mt-2 -mb-[2px]">
              <button
                type="button"
                onClick={second}
                aria-controls="assignments"
                className={ques[1] ? yes : no}
                href="javascript:void(0)"
              >
                {" "}
                Hashtags{" "}
              </button>
            </li>
            {myprofile && myprofile.id === p.id && (
              <>
                <li className="flex mt-2 -mb-[2px]">
                  <button
                    type="button"
                    onClick={third}
                    aria-controls="assignments"
                    className={ques[2] ? yes : no}
                    href="javascript:void(0)"
                  >
                    {" "}
                    Saved Questions{" "}
                  </button>
                </li>
                {/* <li className="flex mt-2 -mb-[2px]">
                  <button
                    type="button"
                    onClick={fourth}
                    aria-controls="assignments"
                    className={ques[3] ? yes : no}
                    href="javascript:void(0)"
                  >
                    {" "}
                    Saved Files{" "}
                  </button>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
      {ques[1] && (
        <div className="w-full m-4 flex flex-wrap gap-8">
          {p.subscribed_hashtags.map((h, index) => (
            <HashCard key={index} h={h} />
          ))}
        </div>
      )}

      {ques[2] && (
        <div className="m-8">
          <div>
            {!loading && sortedPosts && sortedPosts.length > 0
              ? sortedPosts.map((post, index) => (
                  <FeedCard key={index} data={post} />
                ))
              : !loading && (
                  <div className="w-full flex justify-center items-center">
                    <div className="dark:text-white flex flex-col items-center  justify-center">
                      <img src={nodata} className="w-56" />
                      <p className="text-2xl">No data</p>
                    </div>
                  </div>
                )}
          </div>
          {!loading && hasMoreData && (
            <div className="flex justify-center my-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                {posts ? "Load More" : "Try again"}
              </button>
            </div>
          )}
          {loading && (
            <>
              {[...Array(15)].map((_, index) => (
                <QuestionCard key={index} />
              ))}
            </>
          )}
        </div>
      )}
      {ques[3] && (
        <div className="m-8">
          <div>
            {!loading && sortedPosts && myprofile && sortedPosts.length > 0 ? (
              sortedPosts.map((post, index) => (
                <FileCard key={index} file={post} />
              ))
            ) : loading ? (
              <div className="w-full flex justify-center items-center">
                <div className="dark:text-white flex flex-col items-center  justify-center">
                  <img src={nodata} className="w-56" />
                  <p className="text-2xl">No data</p>
                </div>
              </div>
            ) : (
              <FileLoading />
            )}
            {/* {myprofile && sortedPosts.length > 0
              ? sortedPosts.map((post, index) => (
                  <FileCard key={index} file={post} />
                ))
              : !loading && (
                  <div className="w-full flex justify-center items-center">
                    <div className="dark:text-white flex flex-col items-center  justify-center">
                      <img src={nodata} className="w-56" />
                      <p className="text-2xl">No data</p>
                    </div>
                  </div>
                )} */}
          </div>
          {!loading && hasMoreData && (
            <div className="flex justify-center my-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                {posts ? "Load More" : "Try again"}
              </button>
            </div>
          )}
          {loading && (
            <>
              {[...Array(15)].map((_, index) => (
                <FileLoading key={index} />
              ))}
            </>
          )}
        </div>
      )}
      {ques[0] && (
        <div className="m-8">
          <div>
            {sortedPosts && sortedPosts.length > 0
              ? sortedPosts.map((post, index) => (
                  <FeedCard key={index} data={post} />
                ))
              : !loading && (
                  <div className="w-full flex justify-center items-center">
                    <div className="dark:text-white flex flex-col items-center  justify-center">
                      <img src={nodata} className="w-56" />
                      <p className="text-2xl">No data</p>
                    </div>
                  </div>
                )}
          </div>
          {!loading && hasMoreData && (
            <div className="flex justify-center my-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                {posts ? "Load More" : "Try again"}
              </button>
            </div>
          )}
          {loading && (
            <>
              {[...Array(15)].map((_, index) => (
                <QuestionCard key={index} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
