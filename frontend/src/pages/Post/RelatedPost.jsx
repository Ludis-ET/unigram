import { RelatedCard, RelatedLoading } from "../../components";
import { useRelated } from "../../hooks";

export const RelatedPost = ({ data, url }) => {
  const { post } = useRelated(data.id, url);
  return (
    <div className=" overflow-x-hidden overflow-y-scroll h-[90vh] p-2 fixed">
      <h1 className="text-2xl text-gray-700 dark:text-white">
        Related Questions
      </h1>

      {post.length === 0 ? (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => (
            <RelatedLoading key={a} />
          ))}
        </>
      ) : (
        post.map((a, index) => <RelatedCard key={index} data={a} />)
      )}
    </div>
  );
};
