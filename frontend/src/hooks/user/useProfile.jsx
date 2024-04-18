import { useState, useEffect } from "react"

export const useProfile = (backendUrl) => {
    const [profiles, setProfiles] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${backendUrl}api/profiles/`);
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

    const getProfile = async (id) => {
        try {
          const response = await fetch(`${backendUrl}api/profiles/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }
  return { profile, profiles , getProfile};
}
