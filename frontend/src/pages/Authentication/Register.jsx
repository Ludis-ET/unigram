import { useContext, useEffect, useState } from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { ButtonLoading } from "../../components";
import register from "../../assets/register.svg";

export function Register() {
  let { registerUser } = useContext(AuthContext);
  useEffect(() => {
    initTWE({ Input, Ripple });
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    re_password: "",
  });
  const [click, setClick] = useState(false);

  const { first_name, last_name, email, username, password, re_password } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setClick(true);
    await registerUser(e);
    setClick(false);
    setFormData({ ...formData, re_password: "" });
  };

  return (
    <section className="h-screen mt-[300px] md:mt-0 w-full flex justify-center items-center">
      <div className="dark:text-white">
        {/* Left column container with background*/}
        <div className="flex flex-wrap items-center justify-center lg:justify-center">
          <div className="mb-12 lg:w-6/12 xl:w-6/12">
            <form className="max-w-sm mx-auto" onSubmit={(e) => onSubmit(e)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-5">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      autoComplete="on"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your first name here"
                      name="first_name"
                      value={first_name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      autoComplete="on"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your last name here"
                      name="last_name"
                      value={last_name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
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
                      autoComplete="on"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your email here"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
                <div>
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
                      autoComplete="on"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your username here"
                      name="username"
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
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your password here"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="re_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="re_password"
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Confirm your password"
                      name="re_password"
                      value={re_password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {click ? <ButtonLoading text="Registering " /> : "Register"}
              </button>
              <div className="w-full p-4 flex justify-between">
                <Link
                  to="/login"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Have an Account?
                </Link>
              </div>
            </form>
          </div>
          <div className="shrink-1 mb-12 lg:w-6/12 xl:w-6/12">
            <img src={register} className="w-full" alt="Sample image" />
          </div>
        </div>
      </div>
    </section>
  );
}
