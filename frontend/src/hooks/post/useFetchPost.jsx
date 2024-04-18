import { useState, useEffect } from "react";

export const useFetchPosts = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchPost = async (pageNumber) => {
    try {
      setLoading(true);
      let response = await fetch(`${url}?page=${pageNumber}`);
      let get = await response.json();
      if (pageNumber === 1) {
        setData([]);
      }
      if (get.results.length > 0) {
        setData((prevData) => [...prevData, ...get.results]);
      }
      setPage(pageNumber);
      setLoading(false);
      setHasMoreData(get.next !== null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(page);
  }, [url, page]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchPost(nextPage);
  };

  return { data, setData, loading, hasMoreData, setLoading, loadMore, fetchPost };
};
