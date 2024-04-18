import { useContext, useEffect, useState } from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { ButtonLoading } from "../../components";
import emailpic from "../../assets/email.svg";

export function ForgotPassword() {
  let { forgotPassword } = useContext(AuthContext);
  useEffect(() => {
    initTWE({ Input, Ripple });
  }, []);

  const [formData, setFormData] = useState({ email: "" });
  const [click, setClick] = useState(false);

  const { email } = formData;

  const onChange = (e) => setFormData({ [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setClick(true);
    await forgotPassword(e);
    setClick(false);
    setFormData({ email: "" });
  };

  return (
    <section className="h-screen w-full mt-[300px] md:mt-0 flex justify-center items-center">
      <div className="dark:text-white">
        {/* Left column container with background*/}
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img src={emailpic} className="w-full" alt="Sample image" />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form className="max-w-sm mx-auto" onSubmit={(e) => onSubmit(e)}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="your email address"
                  name="email"
                  itemID="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              {/* <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div> */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {click ? <ButtonLoading text="Resetting " /> : "Reset Password"}
              </button>
              <div className="w-full p-4 flex justify-between">
                <Link
                  to="/login"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  remembered password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
