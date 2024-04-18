import React, { useState, useEffect } from "react";

export const useHashtag = () => {
  const [hashtag, setHashtag] = useState(null);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}api/hashtags/?pages=1`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setHashtag(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [backendUrl]);

  return hashtag;
};
