import { useEffect, useState } from "react";

export const useRelated = (id, backendUrl) => {
  const [post, setPost] = useState([]); // Initialize as null

  useEffect(() => {
    const fetchPost = async () => {
      setPost([]);
      try {
        const response = await fetch(`${backendUrl}api/posts/${id}/related`);
        const responseData = await response.json();

        if (response.ok) {
          setPost(responseData);
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
  }, [id, backendUrl]); // Include backendUrl in the dependency array

  return { post };
};
