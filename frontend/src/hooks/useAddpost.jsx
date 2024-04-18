import { useState } from "react";

export const useAddpost = (backendUrl, token, onSuccess, onError) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null)

  const handlePostRequest = async (postData) => {
    setLoading(true);

    try {
      const postResponse = await fetch(`${backendUrl}api/posts/`, {
        method: "POST",
        headers: {
          Authorization: `Alpha ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to create post");
      }

      const postDataJson = await postResponse.json();
      setPost(postDataJson);
      console.log(post);
    } catch (error) {
      console.error("Error:", error.message);
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePostRequest,
  };
};
