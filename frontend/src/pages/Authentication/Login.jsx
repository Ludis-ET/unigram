import { useContext, useEffect, useState } from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { ButtonLoading } from "../../components";

export function Login() {
  let { loginUser } = useContext(AuthContext);
  useEffect(() => {
    initTWE({ Input, Ripple });
  }, []);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [click, setClick] = useState(false);

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setClick(true);
    await loginUser(e);
    setClick(false);
    setFormData({ ...formData, password: "" });
  };

  return (
    <section className="h-screen w-full mt-[300px] md:mt-0 flex justify-center items-center">
      <div className="dark:text-white">
        {/* Left column container with background*/}
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form className="max-w-sm mx-auto" onSubmit={(e) => onSubmit(e)}>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="your username here"
                  name="username"
                  itemID="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  itemID="password"
                  placeholder="your password here"
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="password"
                  value={password}
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
                {click ? <ButtonLoading text="Signing in " /> : "Sign in"}
              </button>
              <div className="w-full p-4 flex justify-between">
                <Link
                  to="/register"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  New Account?
                </Link>

                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
