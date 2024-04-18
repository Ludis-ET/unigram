import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext, MessageContext } from "../../context";

export const useComment = (id, backendUrl) => {
  const { myprofile } = useContext(AuthContext);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const token = authTokens ? authTokens.access : null;
  const { addMessage } = useContext(MessageContext);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`${backendUrl}api/posts/${id}/comments/`);
        if (response.ok) {
          const responseData = await response.json();
          setComment(responseData);
        } else {
          addMessage({ type: "error", text: "Failed to fetch comments" });
        }
      } catch (error) {
        addMessage({ type: "error", text: error.message });
      }
    };

    fetchComment();
  }, [id, backendUrl, addMessage]);

  const add = useCallback(
    async (content) => {
      try {
        const response = await fetch(
          `${backendUrl}api/posts/${id}/comments/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Alpha ${token}`,
            },
            body: JSON.stringify({ content }),
          }
        );

        if (response.status === 201) {
          const newComment = await response.json();
          setComment((prevComments) => [...prevComments, newComment]);
          addMessage({ type: "success", text: "Answer Posted" });
        } else {
          addMessage({ type: "error", text: "Failed to add comment" });
        }
      } catch (error) {
        addMessage({ type: "error", text: error.message });
      }
    },
    [id, token, backendUrl, addMessage]
  );

  const deleteComment = useCallback(
    async (commentId) => {
      try {
        const response = await fetch(
          `${backendUrl}api/posts/${id}/comments/${commentId}/get/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Alpha ${token}`,
            },
          }
        );

        if (response.ok) {
          setComment((prevComments) =>
            prevComments.filter((c) => c.id !== commentId)
          );
          addMessage({ type: "success", text: "Comment deleted successfully" });
        } else {
          const errorMessage = await response.text();
          throw new Error(`Failed to delete comment: ${errorMessage}`);
        }
      } catch (error) {
        addMessage({ type: "error", text: error.message });
      }
    },
    [id, token, backendUrl, addMessage]
  );

  return { add, comment, deleteComment };
};
