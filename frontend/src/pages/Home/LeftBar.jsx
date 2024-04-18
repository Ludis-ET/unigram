import React, { useState, useEffect } from "react";
import { useHashtag } from "../../hooks";
import { Link } from "react-router-dom";

export const LeftBar = () => {
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState(true);
  const hashtag = useHashtag();

  useEffect(() => {
    if (hashtag !== null) {
      setLoading(false);
    }
  }, [hashtag]);

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        onClick={() => setSide(!side)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden absolute top-[150px] right-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className={`fixed top-[130px] md:top-[77px] overflow-y-scroll pb-4 left-0 z-40 w-64 h-screen transition-transform ${
          side && "-translate-x-full z-10"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="dark:bg-gray-900 dark:text-white p-4 h-screen w-64 flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Popular communities</h2>

            <ul className="space-y-2">
              {loading
                ? [1, 2, 3, 4].map((k) => (
                    <li className="pt-3 pb-0 sm:pt-4 animate-pulse" key={k}>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <span className="bg-gray-300 h-4 w-20 block"></span>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <span className="bg-gray-300 h-4 w-16 block"></span>
                        </div>
                      </div>
                    </li>
                  ))
                : hashtag &&
                  hashtag.map(
                    (community, index) =>
                      index < 5 && (
                        <li key={index} className="pt-3 pb-0 sm:pt-4">
                          <Link
                            to={`/hashtags/${community.id}`}
                            className="flex items-center space-x-4 rtl:space-x-reverse"
                          >
                            <div className="flex-shrink-0">#</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {community.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {/* {community.Email} */}
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {community.subscribers &&
                                community.subscribers.length}{" "}
                              subs
                            </div>
                          </Link>
                        </li>
                      )
                  )}
              <li className="pt-3 pb-0 sm:pt-4">
                <Link
                  to="/hashtags"
                  href="#"
                  className="flex items-center space-x-4 rtl:space-x-reverse"
                >
                  <div className="flex-shrink-0">#</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      All Hashtags
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {/* {community.Email} */}
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Information</h2>
            <ul>
              <li>
                <Link
                  to="/about-us"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">About us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <a
                  target="_blank"
                  href="mailto:leulsegedmelaku1020@gmail.com"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Advertise Your Product</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="mailto:leulsegedmelaku1020@gmail.com"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Donate</span>
                </a>
              </li>
            </ul>
          </div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://t.me/hackathon_G1" className="hover:underline">
              Alpha Team
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </aside>
    </>
  );
};
