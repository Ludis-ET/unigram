import { useContext, useState } from "react";
import { AuthContext, MessageContext } from "../../context";

export const usePost = (data, backendUrl) => {
  const { myprofile } = useContext(AuthContext);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const token = authTokens ? authTokens.access : null;
  const { addMessage } = useContext(MessageContext);

  let upvote = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/posts/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            upvote: [...data.upvote, myprofile.id],
            downvote: data.downvote.filter((item) => item !== myprofile.id),
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        console.log(responseData);
        addMessage({ type: "success", text: "question upvoted" });
        data.upvote = responseData.upvote;
        data.downvote = data.downvote.filter((item) => item !== myprofile.id);
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
        fetch(`${backendUrl}api/posts/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            upvote: data.upvote.filter((item) => item !== myprofile.id),
            downvote: data.downvote.filter((item) => item !== myprofile.id),
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
        data.upvote = data.upvote.filter((item) => item !== myprofile.id);
        data.downvote = data.downvote.filter((item) => item !== myprofile.id);
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
        fetch(`${backendUrl}api/posts/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            downvote: [...data.downvote, myprofile.id],
            upvote: data.upvote.filter((item) => item !== myprofile.id),
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        addMessage({ type: "success", text: "question downvoted" });
        data.downvote = responseData.downvote;
        data.upvote = data.upvote.filter((item) => item !== myprofile.id);
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
        fetch(`${backendUrl}api/posts/${data.id}/`, {
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
              ? "question unsaved"
              : "question saved",
        });
        data.saves = responseData.saves;
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let report = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/posts/${data.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            reports:[...data.reports, myprofile.id],
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
          text:"reported successfully we will check and take actions"
        });
        data.saves = responseData.saves;
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };

  return { upvote, downvote, save, clear, report };
};
