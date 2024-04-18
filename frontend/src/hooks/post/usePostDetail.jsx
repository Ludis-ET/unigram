import { useEffect, useState } from "react";

export const usePostDetail = (slug, backendUrl) => {
  const [post, setPost] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${backendUrl}api/posts/?search=${slug}`);
        const responseData = await response.json();

        if (response.ok) {
          setPost([])
          if (responseData.results.length > 0) {
            setPost(responseData.results[0]); // Assuming the first item is the post detail
          } else {
            setPost({ type: "error", text: "Post not found" });
          }
        } else {
          setPost({ type: "error", text: "Failed to fetch post details" });
        }
      } catch (error) {
        setPost({ type: "error", text: error.message });
      }
    };

    fetchPost();

    return () => {
      // Cleanup function if needed
    };
  }, [slug, backendUrl]); // Include backendUrl in the dependency array

  return { post };
};
