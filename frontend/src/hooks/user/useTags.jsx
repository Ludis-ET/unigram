export const useTags = () => {
  const [profiles, setProfiles] = useState(null);

  const fetchTags = async () => {
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
  return { profiles };
};
