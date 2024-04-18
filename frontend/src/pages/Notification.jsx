// Notification.jsx
import React, { useState } from "react";
import {notify} from "./nlogo.jpg"
const notifications = [
  { type: "save", message: "Someone saved your question", time: new Date() },
  { type: "save", message: "Someone saved your question", time: new Date() },
  {
    type: "answer",
    message: "Someone answered your question",
    time: new Date(2024, 3, 3, 10, 30, 0),
  },
  {
    type: "admin",
    message: "Notification from administrators",
    time: new Date(2024, 3, 2, 15, 20, 0),
  },
  {
    type: "admin",
    message: "Notification from administrators",
    time: new Date(2024, 3, 2, 15, 20, 0),
  },
  {
    type: "admin",
    message: "Notification from administrators",
    time: new Date(2024, 3, 2, 15, 20, 0),
  },
  {
    type: "vote",
    message: "Someone upvoted or downvoted your content",
    time: new Date(2024, 2, 25, 18, 45, 0),
  },
];

const Notification = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterTime, setFilterTime] = useState("all");

  const handleChangeType = (value) => {
    setFilterType(value);
  };

  const handleChangeTime = (value) => {
    setFilterTime(value);
  };

  const sortedNotifications = notifications
    .filter((notification) => {
      if (filterType !== "all" && notification.type !== filterType) {
        return false;
      }

      const currentTime = new Date();

      switch (filterTime) {
        case "today":
          return (
            notification.time.toDateString() === currentTime.toDateString()
          );
        case "week":
          return (
            notification.time >=
            new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000)
          );
        case "month":
          return (
            notification.time >=
            new Date(currentTime.getTime() - 30 * 24 * 60 * 60 * 1000)
          );
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (filterTime === "today") {
        const currentTime = new Date();
        const timeDiffA = Math.abs(a.time.getTime() - currentTime.getTime());
        const timeDiffB = Math.abs(b.time.getTime() - currentTime.getTime());
        return timeDiffB - timeDiffA;
      } else {
        return b.time - a.time;
      }
    });

  return (
    <div className="bg-white justify-center w-screen h-screen text-black">
      <div className="bg-white p-4">
        <img src={notify} alt="" />
        <h1 className="text-5xl m-16 text-center font-bold">Notification</h1>
        <div className="flex justify-between mb-6 shadow-2xl">
          <div className="flex space-x-6 font-bold">
            <button
              className={`text-lg cursor-pointer   ${
                filterType === "all"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeType("all")}
            >
              All
            </button>
            <button
              className={`text-lg cursor-pointer   ${
                filterType === "save"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeType("save")}
            >
              Saved
            </button>
            <button
              className={`text-lg cursor-pointer  ${
                filterType === "answer"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeType("answer")}
            >
              Answered
            </button>
            <button
              className={`text-lg cursor-pointer   ${
                filterType === "admin"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeType("admin")}
            >
              Admin
            </button>
            <button
              className={`text-lg cursor-pointer  ${
                filterType === "vote"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeType("vote")}
            >
              Voted
            </button>
          </div>
          <div className="flex space-x-6 ">
            <button
              className={`text-lg cursor-pointer   ${
                filterTime === "all"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeTime("all")}
            >
              All
            </button>
            <button
              className={`text-lg cursor-pointer   ${
                filterTime === "today"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeTime("today")}
            >
              Today
            </button>
            <button
              className={`text-lg cursor-pointer   ${
                filterTime === "week"
                  ? "bg-gray-500 text-white "
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeTime("week")}
            >
              This Week
            </button>
            <button
              className={`text-lg cursor-pointer   ${
                filterTime === "month"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleChangeTime("month")}
            >
              This Month
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-2xl p-2 flex-1 text-xl text-center font-semibold justify-around m-8">
        <div className="flex flex-col space-y-8 ">
          {sortedNotifications.length === 0 ? (
            <p>No notifications found.</p>
          ) : (
            sortedNotifications.map((notification, index) => (
              <div
                key={index}
                className="flex justify-between    shadow-l bg-slate-100"
              >
                <div>
                  <p className="p-4">{notification.message}</p>
                  <p className="text-gray-500 mb-2 text-sm">
                    {notification.time.toLocaleString()}
                  </p>
                  <hr />
                </div>
                <div>
                  <p>{notification.type}</p>
                  <hr />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
