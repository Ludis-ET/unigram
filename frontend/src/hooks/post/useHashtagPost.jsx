import { useState, useEffect } from "react";

export const useHashtagPosts = (backendUrl, hashtagId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchPost = async (pageNumber) => {

    try {
      setLoading(true);
      let response = await fetch(
        `${backendUrl}api/posts/hashtag/${hashtagId}/?page=${pageNumber}`
      );
      let get = await response.json();
      if (pageNumber === 1) {
        setData([]);
      }
      setData((prevData) => [...prevData, ...get.results]);
      setPage(pageNumber);
      setLoading(false);
      setHasMoreData(get.next !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hashtagId) {
      fetchPost(page);
    }
  }, [backendUrl, hashtagId, page]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchPost(nextPage);
  };

  return { data, loading, setData, hasMoreData, loadMore };
};
