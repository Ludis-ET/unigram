import { LeftBar, ForYou } from "./index";

export const Home = () => {
  return (
    <div className="flex gap-12 max-w-screen overflow-x-hidden overflow-y-hidden ">
      <LeftBar />
      <div className=" md:ml-64 w-full pl-6">
        <ForYou />
      </div>
    </div>
  );
};
