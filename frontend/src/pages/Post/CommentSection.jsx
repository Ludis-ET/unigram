import { useEffect, useState } from "react";
import { CommentCard, AddComment } from "../../components";
import { useComment } from "../../hooks";

export const CommentSection = ({ id }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { comment } = useComment(id, backendUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [id]);

  useEffect(() => {
    if (comment !== undefined) {
      setLoading(false);
    }
  }, [comment]);

  return (
    <div className="py-8 w-full ">
      <AddComment id={id} />
      <h1 className="m-8 text-2xl text-gray-600 dark:text-white">
        Answers ({comment ? comment.length : 0})
      </h1>
      {loading ? (
        <p className="m-8 text-gray-600 dark:text-white">Getting comments...</p>
      ) : comment === undefined ? (
        <p className="m-8 text-gray-600 dark:text-white">Loading...</p>
      ) : comment && comment.length > 0 ? (
        comment.map((commentData) => (
          <CommentCard key={commentData.id} post={id} comment={commentData} />
        ))
      ) : (
        <p className="m-8 text-gray-600 dark:text-white">
          No answers yet. Be the first one to answer!
        </p>
      )}
    </div>
  );
};
