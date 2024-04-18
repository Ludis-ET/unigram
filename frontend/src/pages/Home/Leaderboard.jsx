import React, { useContext, useEffect, useState } from "react";
import { useLeaderboard } from "../../hooks";
import { AuthContext } from "../../context";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const { myprofile, user } = useContext(AuthContext);
  const leaderboard = useLeaderboard();

  useEffect(() => {
    if (leaderboard.length > 0) {
      setLoading(false);
    }
  }, [leaderboard]);
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-md min-w-[400px] overflow-hidden mx-auto mt-16">
      <div className="bg-gray-100 dark:bg-gray-700  py-2 px-4">
        <h2 className="text-xl font-semibold dark:text-white text-gray-800">
          Top Performers
        </h2>
      </div>
      <ul className="divide-y dark:divide-gray-600 divide-gray-200">
        {loading
          ? [1, 2, 3, 4, 5].map((item, index) => (
              <li
                key={index}
                className="flex items-center py-4 px-6 animate-pulse"
              >
                <span className="dark:text-white text-gray-700 text-lg font-medium mr-4">
                  {item}.
                </span>
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium dark:text-white text-gray-800 bg-gray-300 h-6 w-4/5 mb-2"></h3>
                  <p className="dark:text-white text-gray-600 text-base bg-gray-300 h-4 w-1/2"></p>
                </div>
              </li>
            ))
          : leaderboard.map(
              (lead, index) =>
                (index < 5 ||
                  (user && myprofile && lead.id === myprofile.id)) && (
                  <Link
                    to={`/${lead.user.username}`}
                    key={index}
                    className="flex items-center py-4 px-6"
                  >
                    <span className="dark:text-white text-gray-700 text-lg font-medium mr-4">
                      {index + 1}.
                    </span>
                    <img
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      src={lead.profile_pic ? lead.profile_pic : Logo}
                      alt="User avatar"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium dark:text-white text-gray-800">
                        {lead.user.first_name} {lead.user.last_name}
                      </h3>
                      <p className="dark:text-white text-sm text-gray-600">
                        @{lead.user.username}
                      </p>
                    </div>
                    <span className="dark:text-white text-gray-700 text-lg font-medium mr-4">
                      {lead.total_upvotes - lead.total_downvotes} votes
                    </span>
                  </Link>
                )
            )}
      </ul>
    </div>
  );
};
