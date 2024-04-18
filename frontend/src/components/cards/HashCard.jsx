import { useContext, useState } from "react";
import { AuthContext, MessageContext } from "../../context";
import { Link } from "react-router-dom";

export const HashCard = ({ h }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const { myprofile } = useContext(AuthContext);
  const { addMessage } = useContext(MessageContext);
  const [load, setLoad] = useState(false);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const token = authTokens ? authTokens.access : null;
  const svg = (
    <svg
      aria-hidden="true"
      className="w-4 h-4 text-gray-200 animate-spin dark:text-white fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
  let sub = async () => {
    setLoad(true);
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/hashtags/${h.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            subscribers: [...h.subscribers, myprofile.id],
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        h.subscribers = [...h.subscribers, myprofile.id];
        setLoad(false);
        addMessage({ type: "success", text: "subscribed" });
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let unsub = async () => {
    setLoad(true);
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}api/hashtags/${h.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Alpha ${token}`,
          },
          body: JSON.stringify({
            subscribers: h.subscribers.filter((item) => item !== myprofile.id),
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let responseData = await response.json(); // Renamed 'data' to 'responseData'

      if (response.status === 200) {
        h.subscribers = h.subscribers.filter((item) => item !== myprofile.id);
        setLoad(false);
        addMessage({ type: "success", text: "unsubscribed" });
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <span className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3 material-symbols-outlined">
        tag
      </span>
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {h.name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 flex justify-between gap-8 dark:text-gray-400">
        <p>{h.subscribers.length} subscribers</p>
        <p>under {h.organization.length} universities</p>
      </p>
      {myprofile && !h.subscribers.includes(myprofile.id) ? (
        load ? (
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r flex from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            subscribing...{svg}
          </button>
        ) : (
          <button
            type="button"
            onClick={sub}
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Subscribe
          </button>
        )
      ) : load ? (
        <button
          type="button"
          className="text-white bg-gradient-to-r flex from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Unsubscribing... {svg}
        </button>
      ) : (
        <button
          type="button"
          onClick={unsub}
          className="text-white bg-gradient-to-r flex from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Unsubscribe
        </button>
      )}
    </div>
  );
};
