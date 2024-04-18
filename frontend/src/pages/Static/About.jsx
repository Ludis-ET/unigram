import { LeftBar } from "../Home";
import { Link } from "react-router-dom";
import logon from "../../assets/home.png";
import { useContext } from "react";
import { AuthContext } from "../../context";
import one from "../../assets/team/1.jpg";
import two from "../../assets/team/2.jpg";
import three from "../../assets/team/3.jpg";
// import image from "../CommunityPage"

export const About = () => {
  const { user } = useContext(AuthContext);
  const users = [
    {
      name: "Leulseged Melaku",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      role: "Backend Lead",
      socials: [
        { icon: <svg />, color: "#39569c", link: "#" },
        { icon: <svg />, color: "#00acee", link: "#" },
        { icon: <svg />, color: "gray-900", link: "#" },
        { icon: <svg />, color: "#ea4c89", link: "#" },
      ],
    },
    {
      name: "Lemesa Elias",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      role: "Frontend Lead",
      socials: [
        { icon: <svg />, color: "#39569c", link: "#" },
        { icon: <svg />, color: "#00acee", link: "#" },
        { icon: <svg />, color: "gray-900", link: "#" },
        { icon: <svg />, color: "#ea4c89", link: "#" },
      ],
    },
    {
      name: "Eden",
      avatar: one,
      role: "Backend",
      socials: [
        { icon: <svg />, color: "#39569c", link: "#" },
        { icon: <svg />, color: "#00acee", link: "#" },
        { icon: <svg />, color: "gray-900", link: "#" },
        { icon: <svg />, color: "#ea4c89", link: "#" },
      ],
    },
    {
      name: "Serdetsion",
      avatar: two,
      role: "Backend",
      socials: [
        { icon: <svg />, color: "#39569c", link: "#" },
        { icon: <svg />, color: "#00acee", link: "#" },
        { icon: <svg />, color: "gray-900", link: "#" },
        { icon: <svg />, color: "#ea4c89", link: "#" },
      ],
    },
    // Add more users as needed
  ];
  return (
    <div>
      <LeftBar />
      <div className="md:ml-[280px] mx-8 ">
        {/* <h1>abebe</h1> */}
        <main>
          <section class="">
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                  UNIGRAM
                </h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Welcome to our platform dedicated to supporting Ethiopian
                  university students in their academic journey. We are
                  committed to providing valuable worksheets and resources to
                  help students excel in their studies and reach their full
                  potential.
                </p>
                {!user && (
                  <Link
                    to="/login"
                    class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    Get started
                    <svg
                      class="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                )}
              </div>
              <div class="hidden w-80 lg:mt-0 lg:col-span-5 lg:flex">
                <img src={logon} alt="mockup" />
              </div>
            </div>
          </section>
        </main>
        <section>
          <section class="">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                  About Us
                </h2>
                <p class="mb-4 font-light">
                  Welcome to our interactive platform for Ethiopian university
                  students!!! <br /> Here, you can access a wide range of useful
                  worksheets to enhance your learning experience. Our goal is to
                  create an engaging environment where students can ask
                  questions, provide answers, and compete with each other in a
                  friendly and supportive community.
                </p>
                <p class="mb-4 font-medium">
                  Deliver great service experiences fast - without the
                  complexity of traditional ITSM solutions.Accelerate critical
                  development work, eliminate toil, and deploy changes with
                  ease.
                </p>
                {!user && (
                  <Link
                    to="/login"
                    class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
                  >
                    Learn more
                    <svg
                      class="ml-1 w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </section>
        <section class="">
          <section class="">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
              <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Our team
                </h2>
                <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                  Team Alpha Students at Addis Ababa Sciense And Technology
                  University GDSC AASTU
                </p>
              </div>
              <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {users.map((user) => (
                  <div key={user.name}>
                    <img
                      className="mx-auto dark:text-white mb-4 w-36 h-36 rounded-full"
                      src={user.avatar}
                      alt={`${user.name} Avatar`}
                    />
                    <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#" className="dark:text-white">
                        {user.name}
                      </a>
                    </h3>
                    <p className="dark:text-white">{user.role}</p>
                    <ul className="flex justify-center mt-4 space-x-4">
                      {user.socials.map((social, index) => (
                        <li key={index}>
                          <a
                            href={social.link}
                            className={`text-${social.color} hover:text-gray-900 dark:hover:text-white`}
                          >
                            {social.icon}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};
