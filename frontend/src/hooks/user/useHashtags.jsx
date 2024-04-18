import { useState, useEffect } from "react";

export const useHashtags = (backendUrl) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}api/hashtags/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [backendUrl]);
  return { profiles };
};
