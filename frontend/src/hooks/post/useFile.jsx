import { useContext, useState } from "react";
import { AuthContext, MessageContext } from "../../context";
import { useNavigate } from "react-router-dom";

export const useFile = (data, backendUrl) => {
  const navigate = useNavigate();
  const { myprofile } = useContext(AuthContext);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const { addMessage } = useContext(MessageContext);
  const token = authTokens ? authTokens.access : null;

  let upvote = async () => {
    console.log(data);
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/files/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            upvotes: [...data.upvotes, myprofile.id],
            downvotes: data.downvotes.filter((item) => item !== myprofile.id),
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        console.log(responseData);
        addMessage({ type: "success", text: "File upvoted" });
        data.upvotes = responseData.upvotes;
        data.downvotes = data.downvotes.filter((item) => item !== myprofile.id);
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let clear = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/files/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            upvotes: data.upvotes.filter((item) => item !== myprofile.id),
            downvotes: data.downvotes.filter((item) => item !== myprofile.id),
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        console.log(responseData);
        addMessage({ type: "success", text: "vote cleared" });
        data.upvotes = data.upvotes.filter((item) => item !== myprofile.id);
        data.downvotes = data.downvotes.filter((item) => item !== myprofile.id);
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let downvote = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/files/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            downvotes: [...data.downvotes, myprofile.id],
            upvotes: data.upvotes.filter((item) => item !== myprofile.id),
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        addMessage({ type: "success", text: "File downvoted" });
        data.downvotes = responseData.downvotes;
        data.upvotes = data.upvotes.filter((item) => item !== myprofile.id);
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let save = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/files/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            saves:
              data.saves.indexOf(myprofile.id) !== -1
                ? data.saves.filter((item) => item !== myprofile.id)
                : [...data.saves, myprofile.id],
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        addMessage({
          type: "success",
          text:
            data.saves.indexOf(myprofile.id) !== -1
              ? "File unsaved"
              : "File saved",
        });
        data.saves = responseData.saves;
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let download = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/files/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            downloads: [...data.downloads, myprofile.id],
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        addMessage({
          type: "success",
          text: "File download started",
        });
        data.downloads = responseData.downloads;

        // Start download using the link obtained from .download
        startDownload(data.file);
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };

  let report =  async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/files/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            reports: [...data.reports, myprofile.id],
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        addMessage({
          type: "success",
          text: "File reported we will check and take actions tank you for your information",
        });
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  }
  // Function to start download
  let startDownload = (downloadLink) => {
    // Create an anchor element to initiate the download
    let link = document.createElement("a");
    link.href = downloadLink;
    link.download = ""; // Optional: set a default download filename
    link.click();
  };

  return { upvote, downvote, save, clear, download, report };
};
