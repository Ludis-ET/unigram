import React, { useState } from "react";
import ppo from "../CommunityPage/pp.jpg";
import pp from "../CommunityPage/profile.jpg";
import comment from "../CommunityPage/comment.jpg";
import share from "../CommunityPage/share.jpg";
import image2 from "../CommunityPage/image2.jpg";
import image3 from "../CommunityPage/image3.jpg";

function CommunityPage() {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(1);
  const [value3, setValue3] = useState(1);

  const incrementNumber1 = () => {
    setValue1((prevValue) => Math.min(prevValue - 1));
  };

  const decrementNumber1 = () => {
    setValue1((prevValue) => Math.max(prevValue + 1, 1));
  };

  const incrementNumber2 = () => {
    setValue2((prevValue) => Math.min(prevValue - 1));
  };

  const decrementNumber2 = () => {
    setValue2((prevValue) => Math.max(prevValue + 1, 1));
  };

  const incrementNumber3 = () => {
    setValue3((prevValue) => Math.min(prevValue - 1));
  };

  const decrementNumber3 = () => {
    setValue3((prevValue) => Math.max(prevValue + 1, 1));
  };

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [contentChanged, setContentChanged] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setContentChanged(true);
    // Set a timeout to remove the "Content Changed" message after 2 seconds
    setTimeout(() => setContentChanged(false), 2000);
  };

  return (
    <div className="text-black w-full mx-auto mt-4 pt-12">
      <div className="px-2 py-2 pt-2">
        <div className="flex mb-0">
          <div
            style={{ marginTop: "-100px" }}
            className="bg-slate-100  p-8 mt-4  w-full rounded-3xl flex items-end"
          >
            <img
              className="pt-2 w-32 h-32 rounded-full "
              src={pp}
              alt="profile"
            />
            <div className="ml-12 flex-3">
              <h1 className="text-xl font-bold">4 Subscribers</h1>
            </div>
            <div className="text-sm text-black mt-auto mx-auto my-auto items-center mr-4 mt-6">
              <div className="text-2xl font-bold ml-12"> t/books</div>
              <div className="ml-4"> Since Tue Sep 03 2024</div>
              <div className="text-xl font-semibold">
                the number 1 forum on internet
              </div>
              <div className=" ml-6  font-semibold text-xl">7 points</div>
            </div>
            <div className="mb-4 flex items-center ml-auto">
              <h2 className="text-lg font-bold mr-auto">7 Comments</h2>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl pt-0  w-full">
          <div className="bg-white rounded-xl p-8  w-full">
            <div className="shadow-2xl w-full mt-0 flex justify-around items-center px-4 py-2 rounded-xl">
              <button className="bg-blue-400  text-white px-48 py-4 text-xl rounded-3xl font-bold ">
                Leave
              </button>

              <select className="rounded-lg py-2 px-2  bg-slate-100 w-24 px-24 text-xl font-bold">
                <option value="option1">More</option>
                <option value="option3">Option 1</option>
                <option value="option3">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
          <div className="flex bg-white text-xl font-semibold">
            <div className="">
              <button
                className={`bg-white px-4 py-2 mr-2 ${
                  selectedFilter === "Today" ? "bg-blue-400 text-black" : ""
                }`}
                onClick={() => handleFilterChange("Today")}
              >
                Today
              </button>
              <button
                className={`bg-white px-4 py-2 mr-2 ${
                  selectedFilter === "Week" ? "bg-blue-400 text-black" : ""
                }`}
                onClick={() => handleFilterChange("Week")}
              >
                Week
              </button>
              <button
                className={`bg-white px-4 py-2 ${
                  selectedFilter === "Month" ? "bg-blue-400 text-black" : ""
                }`}
                onClick={() => handleFilterChange("Month")}
              >
                Month
              </button>
              <button
                className={`bg-white text-black px-4 py-2 ml-2 ${
                  selectedFilter === "All" ? "bg-blue-400 text-black" : ""
                }`}
                onClick={() => handleFilterChange("All")}
              >
                All
              </button>
            </div>
            <div className="flex ml-auto">
              <button className="bg-white px-4 py-2">Hot</button>
              <button className="bg-white px-4 py-2">New</button>
              <button className="bg-white px-4 py-2">Top</button>
            </div>
          </div>

          <hr />

          {contentChanged && (
            <div className="mt-4 text-center text-red-500 font-bold">
              Content Changed
            </div>
          )}

          <div className="mt-6">
            {selectedFilter === "Today" && (
              <div className="bg-white p-6 rounded-3xl shadow-2xl  flex items-center mb-4">
                {/* Content for Today */}
              </div>
            )}
            {selectedFilter === "Week" && (
              <div className="bg-white p-6 rounded-3xl shadow-2xl  flex items-center mb-4">
                {/* Content for Week */}
              </div>
            )}
            {selectedFilter === "Month" && (
              <div className="bg-white p-6 rounded-3xl shadow-2xl  flex items-center mb-4">
                {/* Content for Month */}
              </div>
            )}
            {selectedFilter === "All" && (
              <div className="bg-white rounded-3xl  flex items-center mb-0">
                <div className="flex-1 ">
                  <div className=" w-full">
                    <div className="bg-white  rounded-3xl shadow-2xl  flex items-center mb-1">
                      <img
                        className=" h-48 w-64 mt-0 mr-4"
                        src={ppo}
                        alt="profile"
                      />
                      <div>
                        <p className="font-bold mt-0">Fiction is an illusion</p>
                        <div className="flex mt-32 ">
                          <p className="mt-4">By</p>
                          <p className="text-blue-500 ml-1 mt-4">u/reader2</p>
                          <p className="">
                            {" "}
                            <img
                              className="pt-1 mt-42 w-12 h-12 rounded-full ml-1 "
                              src={ppo}
                              alt="profile"
                            />
                          </p>
                          <p className="ml-1 mr-1 mt-4">in</p>
                          <p className="text-red-400 mt-4"> t/books</p>
                          <p>
                            {" "}
                            <img
                              className="pt-1 w-12 h-12 rounded-full "
                              src={pp}
                              alt="profile"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow "></div>
                      <p className=" mt-36 mr-6 text-center text-gray-500">
                        {" "}
                        Tue Feb 05 2045 4:00:06PM
                      </p>
                      <div className="mr-32 space-x-2">
                        <div className="flex">
                          <img className="h-12 w-12" src={comment} alt="" />
                          <button className="text-xl font-bold bg-white px-2 py-1 rounded">
                            758 comments
                          </button>
                        </div>
                        <br />
                        <div className="flex">
                          <img className="h-12 w-12 " src={share} alt="" />
                          <button className="text-xl border font-bold bg-white px-2 py-1 rounded">
                            share
                          </button>
                        </div>
                        <br />
                        <button className="text-xl border font-bold bg-white px-2 py-1 rounded">
                          ... more
                        </button>
                      </div>
                      <div className="mt-0 ml-auto">
                        <div className="relative flex-6 items-center">
                          <button
                            className="w-12 h-12 px-16 py-6 bg-blue-300 text-black flex justify-center items-center text-4xl font-bold cursor-pointer outline-none shadow-md"
                            onClick={decrementNumber1}
                          >
                            &#94;
                          </button>
                          <input
                            className="bg-white text-black text-3xl font-bold rounded p-6 py-4 w-32 text-center outline-none mx-2 mr-12"
                            value={value1}
                            readOnly
                          />
                          <button
                            className="w-12 h-12 px-16 py-6 bg-orange-300 text-black flex justify-center items-center text-4xl font-bold cursor-pointer outline-none shadow-md"
                            onClick={incrementNumber1}
                          >
                            &#709;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" w-full">
                    <div className="bg-white  rounded-3xl shadow-2xl  flex items-center mb-1">
                      <img
                        className=" h-48 w-64 mt-0 mr-4"
                        src={ppo}
                        alt="profile"
                      />
                      <div>
                        <p className="font-bold mt-0">Fiction is an illusion</p>
                        <div className="flex mt-32 ">
                          <p className="mt-4">By</p>
                          <p className="text-blue-500 ml-1 mt-4">u/reader2</p>
                          <p className="">
                            {" "}
                            <img
                              className="pt-1 mt-42 w-12 h-12 rounded-full ml-1 "
                              src={ppo}
                              alt="profile"
                            />
                          </p>
                          <p className="ml-1 mr-1 mt-4">in</p>
                          <p className="text-red-400 mt-4"> t/books</p>
                          <p>
                            {" "}
                            <img
                              className="pt-1 w-12 h-12 rounded-full "
                              src={pp}
                              alt="profile"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow "></div>
                      <p className=" mt-36 mr-6 text-center text-gray-500">
                        {" "}
                        Tue Feb 05 2045 4:00:06PM
                      </p>
                      <div className="mr-32 space-x-2">
                        <div className="flex">
                          <img className="h-12 w-12" src={comment} alt="" />
                          <button className="text-xl font-bold bg-white px-2 py-1 rounded">
                            758 comments
                          </button>
                        </div>
                        <br />
                        <div className="flex">
                          <img className="h-12 w-12 " src={share} alt="" />
                          <button className="text-xl border font-bold bg-white px-2 py-1 rounded">
                            share
                          </button>
                        </div>
                        <br />
                        <button className="text-xl border font-bold bg-white px-2 py-1 rounded">
                          ... more
                        </button>
                      </div>
                      <div className="mt-0 ml-auto">
                        <div className="relative flex-6 items-center">
                          <button
                            className="w-12 h-12 px-16 py-6 bg-blue-300 text-black flex justify-center items-center text-4xl font-bold cursor-pointer outline-none shadow-md"
                            onClick={decrementNumber2}
                          >
                            &#94;
                          </button>
                          <input
                            className="bg-white text-black text-3xl font-bold rounded p-6 py-4 w-32 text-center outline-none mx-2 mr-12"
                            value={value2}
                            readOnly
                          />
                          <button
                            className="w-12 h-12 px-16 py-6 bg-orange-300 text-black flex justify-center items-center text-4xl font-bold cursor-pointer outline-none shadow-md"
                            onClick={incrementNumber2}
                          >
                            &#709;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" w-full">
                    <div className="bg-white  rounded-3xl shadow-2xl  flex items-center mb-1">
                      <img
                        className=" h-48 w-64 mt-0 mr-4"
                        src={ppo}
                        alt="profile"
                      />
                      <div>
                        <p className="font-bold mt-0">Fiction is an illusion</p>
                        <div className="flex mt-32 ">
                          <p className="mt-4">By</p>
                          <p className="text-blue-500 ml-1 mt-4">u/reader2</p>
                          <p className="">
                            {" "}
                            <img
                              className="pt-1 mt-42 w-12 h-12 rounded-full ml-1 "
                              src={ppo}
                              alt="profile"
                            />
                          </p>
                          <p className="ml-1 mr-1 mt-4">in</p>
                          <p className="text-red-400 mt-4"> t/books</p>
                          <p>
                            {" "}
                            <img
                              className="pt-1 w-12 h-12 rounded-full "
                              src={pp}
                              alt="profile"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow "></div>
                      <p className=" mt-36  mr-6 text-center text-gray-500">
                        {" "}
                        Tue Feb 05 2045 4:00:06PM
                      </p>
                      <div className="mr-32 space-x-2">
                        <div className="flex">
                          <img className="h-12 w-12" src={comment} alt="" />
                          <button className="text-xl font-bold bg-white px-2 py-1 rounded">
                            758 comments
                          </button>
                        </div>
                        <br />
                        <div className="flex">
                          <img className="h-12 w-12 " src={share} alt="" />
                          <button className="text-xl border font-bold bg-white px-2 py-1 rounded">
                            share
                          </button>
                        </div>
                        <br />
                        <button className="text-xl border font-bold bg-white px-2 py-1 rounded">
                          ... more
                        </button>
                      </div>
                      <div className="mt-0 ml-auto">
                        <div className="relative flex-6 items-center">
                          <button
                            className="w-12 h-12 px-16 py-6 bg-blue-300 text-black flex justify-center items-center text-4xl font-bold cursor-pointer outline-none shadow-md"
                            onClick={decrementNumber3}
                          >
                            &#94;
                          </button>
                          <input
                            className="bg-white text-black text-3xl font-bold rounded p-6 py-4 w-32 text-center outline-none mx-2 mr-12"
                            value={value3}
                            readOnly
                          />
                          <button
                            className="w-12 h-12 px-16 py-6 bg-orange-300 text-black flex justify-center items-center text-4xl font-bold cursor-pointer outline-none shadow-md"
                            onClick={incrementNumber3}
                          >
                            &#709;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ;
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
