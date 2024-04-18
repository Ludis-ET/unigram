import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context";
import { formatDistanceToNow } from "date-fns";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const Notification = () => {
  const [not, setNot] = useState(false);
  const { myprofile } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      if (myprofile && authTokens) {
        try {
          setLoading(true); // Set loading state to true before fetching
          const id = myprofile.id;
          const token = authTokens ? authTokens.access : null;
          const response = await fetch(
            `${backendUrl}api/profiles/${id}/notifications/`,
            {
              headers: {
                Authorization: `Alpha ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setNotifications(data);
            console.log(data);
          } else {
            console.error(
              "Failed to fetch notifications:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false); // Set loading state to false after fetching
        }
      }
    };

    fetchNotifications();
  }, [myprofile, authTokens]);

  return (
    <>
      <button
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
        onClick={() => setNot(!not)}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        {/*  */}
        {notifications && notifications.length > 0 && (
          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
        )}
      </button>

      {not && (
        <div
          id="dropdownNotification"
          className={`z-20 absolute top-[70px] right-2 md:right-8 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700`}
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            <b>{notifications && notifications.length}</b> Notifications
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading && !notifications ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <div
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    key={index}
                  >
                    <div className="flex-shrink-0">
                      <div className="animate-pulse rounded-full w-11 h-11 bg-gray-300"></div>
                    </div>
                    <div className="w-full ps-3">
                      <div className="text-gray-300 text-sm mb-1.5 dark:text-gray-400">
                        {/* Placeholder for name */}
                        <div className="font-semibold bg-gray-300 h-5 w-20 mb-1 animate-pulse"></div>
                        {/* Placeholder for post content */}
                        <div className="bg-gray-300 h-4 w-full animate-pulse"></div>
                      </div>
                      {/* Placeholder for timestamp */}
                      <div className="text-xs text-gray-300 bg-gray-300 w-20 h-3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {notifications
                  .slice(-4)
                  .reverse()
                  .map((notification, index) => (
                    <a
                      href="#"
                      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={notification.id}
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="rounded-full w-11 h-11"
                          src={Logo}
                          alt="Profile"
                        />
                        <div
                          className={`absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 ${
                            index % 2 === 0 ? "bg-blue-600" : "bg-gray-900"
                          } border border-white rounded-full dark:border-gray-800`}
                        >
                          <svg
                            className="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                            <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="w-full ps-3">
                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                          {notification.message}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-500">
                          {formatDistanceToNow(
                            new Date(notification.timestamp),
                            { addSuffix: true }
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
              </>
            )}
          </div>

          <Link
            to="/notifications"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            <div className="inline-flex items-center ">
              <svg
                className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View all
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
