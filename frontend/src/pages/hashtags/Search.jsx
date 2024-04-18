import { useState, useEffect } from "react";
import { LeftBar } from "../Home";
import { FeedCard, QuestionCard } from "../../components";
import { useFetchPosts } from "../../hooks";
import { useParams } from "react-router-dom";
import nodata from "../../assets/nodata.svg";

export const Search = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { search } = useParams();

  const [sortedPosts, setSortedPosts] = useState([]);

  const {
    data: posts,
    loading,
    hasMoreData,
    setData,
    loadMore,
  } = useFetchPosts(`${backendUrl}api/posts/?search=${search}&`);

  const handleLoadMore = () => {
    loadMore();
  };

  useEffect(() => {
    if (posts) {
      // Sort the posts based on the difference between upvotes and downvotes
      const sorted = [...posts].sort((a, b) => {
        const scoreA = a.upvote.length - a.downvote.length;
        const scoreB = b.upvote.length - b.downvote.length;
        return scoreB - scoreA;
      });
      setSortedPosts(sorted);
    }
  }, [posts, search]);

  return (
    <div>
      <LeftBar />
      <div className="md:ml-[280px] mx-8">
        <h1 className="text-2xl dark:text-white">Searched for: {search}</h1>

        <div className="m-8">
          {sortedPosts.length > 0
            ? sortedPosts.map((post, index) => (
                <FeedCard key={index} data={post} />
              ))
            : !loading && (
                <div className="w-full flex justify-center h-screen items-center">
                  <div className="dark:text-white flex flex-col items-center justify-center">
                    <img src={nodata} className="w-56" alt="No data found" />
                    <p className="text-2xl">No Question Found</p>
                  </div>
                </div>
              )}

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
      </div>
    </div>
  );
};
