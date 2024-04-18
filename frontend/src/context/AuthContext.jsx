import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "./MesssageContext";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [myprofile, setProfile] = useState(null);

  const [loadingMyProfile, setLoadingMyProfile] = useState(true);
  useEffect(() => {
    if (authTokens && user) {
      const id = user.user_id;
      const getProfile = async () => {
        try {
          const token = authTokens ? authTokens.access : null;
          const response = await fetch(`${backendUrl}api/profile/${id}`, {
            headers: {
              Authorization: `Alpha ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
          } else {
            console.error("Failed to fetch profile data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoadingMyProfile(false); // Set loading state to false after fetching
        }
      };
      getProfile();
    }
  }, [authTokens, user]);
  const [loading, setLoading] = useState(true);

  const { addMessage } = useContext(MessageContext);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}auth/jwt/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let data = await response.json();

      if (response.status === 200) {
        setauthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        addMessage({ type: "success", text: "Logged in successfully" });
        navigate("/");
      } else {
        addMessage({ type: "error", text: "Invalid Credentials" });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };

  let forgotPassword = async (e) => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}auth/users/reset_password/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: e.target.email.value,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      if (response.status === 204) {
        addMessage({
          type: "success",
          text: `The password reset link has been sent to the email address ${e.target.email.value}`,
        });
        navigate("/login");
      } else {
        addMessage({
          type: "error",
          text: "Trouble Sending Email please try again",
        });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };

  let resetPassword = async (uid, token, new_password, re_new_password) => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}auth/users/reset_password_confirm/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
            token: token,
            new_password: new_password,
            re_new_password: re_new_password,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      if (response.status === 204) {
        addMessage({
          type: "success",
          text: `Password reset successfully.`,
        });
        navigate("/login");
      } else {
        let data = await response.json();
        for (let key in data) {
          data[key].forEach((value) => {
            addMessage({
              type: "error",
              text: value,
            });
          });
        }
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };
  let activateAccount = async (uid, token) => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}auth/users/activation/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
            token: token,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      if (response.status === 204) {
        addMessage({
          type: "success",
          text: `Account activated `,
        });
        navigate("/login");
        return;
      }

      let data = await response.json();

      if (typeof data === "object" && data !== null) {
        for (let key in data) {
          if (Array.isArray(data[key])) {
            data[key].forEach((value) => {
              addMessage({
                type: "error",
                text: value,
              });
            });
          } else {
            addMessage({
              type: "error",
              text: data[key],
            });
          }
        }
      } else {
        addMessage({
          type: "error",
          text: "Unexpected response format",
        });
      }

      navigate("/login");
    } catch (error) {
      addMessage({ type: "error", text: error.message });
      navigate("/login");
    }
  };

  let registerUser = async (e) => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}auth/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
            re_password: e.target.re_password.value,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 60000)
        ),
      ]);

      if (response.status === 201) {
        addMessage({
          type: "success",
          text: "Thank you for creating your account. ",
        });
        navigate("/login");
      } else if (response.status == 400) {
        let data = await response.json();
        for (let key in data) {
          data[key].forEach((value) => {
            addMessage({
              type: "error",
              text: value,
            });
          });
        }
      } else {
        addMessage({
          type: "error",
          text: "Please Try Again",
        });
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };

  let updateToken = async () => {
    try {
      let response = await Promise.race([
        fetch(`${backendUrl}auth/jwt/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: authTokens?.refresh,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 20000)
        ),
      ]);

      let data = await response.json();
      if (response.status === 200) {
        setauthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        setUser(null);
        setauthTokens(null);
        localStorage.removeItem("authToken");
        // navigate("/login");
      }
      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    }
  };

  let logoutUser = () => {
    setUser(null);
    setauthTokens(null);
    localStorage.removeItem("authTokens");
    addMessage({ type: "success", text: "Logged out successfully" });
    navigate("/login");
  };
  const value = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    registerUser: registerUser,
    activateAccount: activateAccount,
    myprofile: myprofile,
    loadingMyProfile: loadingMyProfile,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMin = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMin);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
