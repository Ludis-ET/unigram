import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

import { usePostDetail } from "../../hooks";
import { RelatedPost } from "./RelatedPost";
import { useParams } from "react-router-dom";
import { CommentSection } from "./CommentSection";
import { AboutPost } from "./AboutPost";

import logo from "../../assets/logo.png";

export const Post = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { slug } = useParams();
  const { post } = usePostDetail(slug, backendUrl);
  const [main, setMain] = useState(false);

  return (
    <div className="flex gap-8 min-h-screen">
      {post && (
        <div className="h-screen w-[350px]  px-4">
          <RelatedPost data={post} url={backendUrl} />
        </div>
      )}
      <div>
        <main className="pt-8  pb-16 lg:pt-16 lg:pb-24  antialiased">
          {!main ? (
            <div className="flex absolute flex-col gap-8 justify-center w-full h-full items-center">
              <div className="relative flex justify-center items-center">
                <div
                  className={`absolute ${
                    !post && "animate-spin"
                  } rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500`}
                ></div>
                <img
                  src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
                  className="rounded-full h-28 w-28"
                />
              </div>
              <h1 className="dark:text-white text-gray-700 text-2xl">
                {post && post.type === "error"
                  ? "No data found"
                  : post
                  ? setMain(!main)
                  : "Loading..."}
              </h1>
            </div>
          ) : (
            <div className="flex flex-wrap justify-between max-w-screen px-4 mx-auto max-w-screen-xl ">
              <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                  <div className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src={
                          post.owner.profile_pic
                            ? backendUrl + post.owner.profile_pic
                            : logo
                        }
                        alt="Jese Leos"
                      />
                      <div>
                        <Link
                          to={`/${post.owner.username}`}
                          rel="author"
                          className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                          {post.owner.first_name} {post.owner.last_name}
                        </Link>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          @{post.owner.username}
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          <time
                            pubdate
                            datetime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            {formatDistanceToNow(new Date(post.added_time), {
                              addSuffix: true,
                            })}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                  <h1 className="mb-4 text-3xl flex flex-wrap font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {post.name}
                  </h1>
                </header>
                <div className="flex flex-wrap gap-2 p-2">
                  {post.tags.map((tag) => (
                    <Link
                      to={`/tags/${tag.id}`}
                      className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <p>{post.description}</p>
                {post && post.images.length > 0 && (
                  <div className="flex flex-col bg-gray-200 dark:bg-gray-900 m-auto p-auto">
                    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                        {post.images.map((p, index) => (
                          <a
                            key={index}
                            href={p.images}
                            target="_blank"
                            className="inline-block px-3"
                          >
                            <img
                              src={p.images}
                              className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
        {post && <CommentSection id={post.id} />}
      </div>
      {post ? (
        <AboutPost post={post}  />
      ) : (
        <div>
          {/* Skeleton Loading Effect */}
          <div className="w-full md:fixed p-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="animate-pulse flex flex-col items-center">
              <div className="flex gap-4">
                {/* Placeholder for Vote Count */}
                <div className="w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                {/* Placeholder for Save Count */}
                <div className="w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
              </div>
              <div className="flex gap-4 mt-4 md:mt-6">
                {/* Placeholder for Vote Button */}
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                {/* Placeholder for Save Button */}
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                {/* Placeholder for Floppy Disk Icon */}
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                {/* Placeholder for Share Icon */}
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                {/* Placeholder for Report Button */}
                <div className="w-20 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
