import React, { useState, useEffect, useContext } from "react";
import { LeftBar } from "../../pages/Home";
import { AuthContext } from "../../context";
import { formatDistanceToNow } from "date-fns";

export const Points = () => {
  const { myprofile } = useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      if (myprofile && authTokens) {
        try {
          setLoading(true);
          const id = myprofile.id;
          const token = authTokens ? authTokens.access : null;
          const response = await fetch(
            `${backendUrl}api/profiles/${id}/badges/`,
            {
              headers: {
                Authorization: `Alpha ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setNotifications(data);
          } else {
            console.error(
              "Failed to fetch notifications:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [myprofile, authTokens]);

  return (
    <div className="h-screen grid place-items-center my-8 p-8">
      <LeftBar />
      <div className="lg:w-2/5 sm:w-3/5 w-full bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
        <div className="inline-flex items-center justify-between w-full">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">
            Points
          </h3>
          <button className="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:scale-110 dark:text-gray-800 dark:hover:bg-gray-100">
            {myprofile && myprofile.net_points} total points
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="mt-8 px-6 py-4 bg-white rounded-lg shadow w-full"
              >
                <div className="inline-flex items-center justify-between w-full">
                  <div className="inline-flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
                      alt="Notification Icon"
                      className="w-6 h-6 mr-3"
                    />
                    <h3 className="font-bold text-base text-gray-800">
                      point reward {"===>"} {notification.value}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="mt-1 text-sm">{notification.reason}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
