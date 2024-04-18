import { useState, useEffect } from "react";
import { LeftBar } from "../Home";
import { Filter } from "./Filter";
import { useFetchPosts } from "../../hooks";
import { FileCard, FileLoading } from "../../components";
import nodata from "../../assets/nodata.svg";

export const Files = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const [sortedPosts, setSortedPosts] = useState([]);

  const [url, setUrl] = useState([]);

  const [search, setSearch] = useState("");

  const {
    data: posts,
    loading,
    hasMoreData,
    setData,
    loadMore,
  } = useFetchPosts(
    `${backendUrl}api/files/${
      search.length > 0 ? `?search=${search}&` : ""
    }${url.map((x) => `?tag=${x}&`).join("")}`
  );

  const handleLoadMore = () => {
    loadMore();
  };
  console.log(posts);
  useEffect(() => {
    setData([]);
  }, [url, setData, search]);
  useEffect(() => {
    if (posts) {
      // Sort the posts based on the difference between upvotes and downvotes
      const sorted = [...posts].sort((a, b) => {
        const scoreA = a.upvotes.length - a.downvotes.length;
        const scoreB = b.upvotes.length - b.downvotes.length;
        return scoreB - scoreA;
      });
      setSortedPosts(sorted);
    }
  }, [posts]);
  return (
    <div>
      <LeftBar />
      <div className="md:ml-[280px] mx-8 flex flex-wrap gap-4 ">
        <div>
          <h1 className="text-2xl dark:text-white">
            {search.length > 0 && `searched for: ${search}`}
          </h1>
          {sortedPosts &&
            sortedPosts.map(
              (post, index) =>
                post.reports.length <= 0 && <FileCard key={index} file={post} />
            )}
          {loading && (
            <>
              {[...Array(15)].map((_, index) => (
                <FileLoading key={index} />
              ))}
            </>
          )}
          {!loading && hasMoreData ? (
            <div className="flex justify-center my-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoadMore}
              >
                {posts ? "Load More" : "Try again"}
              </button>
            </div>
          ) : (
            !loading &&
            sortedPosts.length === 0 && (
              <div className="w-[100vh] flex justify-center h-screen items-center">
                <div className="dark:text-white flex flex-col items-center justify-center">
                  <img src={nodata} className="w-56" alt="No data found" />
                  <p className="text-2xl">No Files Found</p>
                </div>
              </div>
            )
          )}
        </div>
        <Filter url={url} search={setSearch} set={setUrl} />
      </div>
    </div>
  );
};
