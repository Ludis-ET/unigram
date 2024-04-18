import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { useParams, useNavigate } from "react-router-dom";

export function ActivateAccount() {
  let { activateAccount } = useContext(AuthContext);
  let navigate = useNavigate(); // Define navigate here

  const { uid, token } = useParams();

  useEffect(() => {
    const activate = async () => {
      try {
        await activateAccount(uid, token);
        navigate("/login");
      } catch (error) {
        console.error("Error activating account:", error);
        navigate("/login");
      }
    };

    activate();
  }, [activateAccount, navigate, uid, token]);

  return <>hey</>;
}
