import { useContext, useEffect, useState } from "react";
import { Select } from "../../components";
import { AuthContext, MessageContext } from "../../context";

export const Filter = ({ url, set, search }) => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [load, setLoad] = useState(false);
  const [tags, setTags] = useState([]);
  const [modal, setModal] = useState(false);
  const { myprofile } = useContext(AuthContext);
  const { addMessage } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const token = authTokens ? authTokens.access : null;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleFileChange = (event) => {
    // Retrieve the selected file
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleNameChange = (event) => {
    // Retrieve the value of the name input
    const enteredName = event.target.value;
    setName(enteredName);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    setLoading(true);
    const selectedOptionIds = selectedOptions.map((option) => option.id);

    try {
      const formData = new FormData();
      // formData.append("file", file);
      formData.append("name", name);
      formData.append("author", myprofile.id);
      formData.append("tag", JSON.stringify(selectedOptionIds));

      // const response = await fetch(`${backendUrl}api/files/`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     file: null,
      //     name: name,
      //     author: myprofile.id,
      //     tags: [0],
      //   }),
      //   headers: {
      //     Authorization: `Alpha ${token}`,
      //   },
      // });

      addMessage({
        type: "success",
        text: "File uploaded successfully! we will check and approve it",
      });
      setModal(false)
      // Additional logic after successful upload
    } catch (error) {
      console.error("Error uploading file:", error.message);
      // Additional error handling
    }
    setLoading(false);
  };

  const getTags = async () => {
    setLoad(true);
    let response = await fetch(`${backendUrl}api/tags/`);
    let data = await response.json();
    setTags(data);
    setLoad(false);
  };

  useEffect(() => {
    getTags();
  }, [backendUrl]);
  const click = (id) => {
    if (url.indexOf(id) !== -1) {
      set(url.filter((a) => a !== id));
    } else {
      set([...url, id]);
    }
  };
  const f =
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const s =
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    search(null);
    const searchData = e.target.search.value.trim(); // Remove leading and trailing whitespace
    const sanitizedSearch = searchData.replace(/\s+/g, "+"); // Replace spaces with '+'
    // console.log(sanitizedSearch);
    search(sanitizedSearch);
    e.target.search.value = "";
    // Call any other functions if needed
  };

  return (
    <button
      type="button"
      className="max-w-md h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Filter Files
      </h5>
      <div className="w-full flex items-center justify-center m-4">
        {myprofile && (
          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setModal(!modal)}
          >
            Contibute File
          </button>
        )}
      </div>

      {modal && (
        <div
          id="authentication-modal"
          tabindex="-1"
          aria-hidden="true"
          class="overflow-y-auto overflow-x-hidden fixed top-2 right-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Files
                </h3>
                <button
                  type="button"
                  onClick={() => setModal(!modal)}
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5">
                <form onSubmit={handleSubmit2} className="space-y-4">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name ?
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="password"
                      placeholder=""
                      value={name}
                      onChange={handleNameChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <Select
                    selectedOptions={selectedOptions}
                    onChange={handleSelectedOptionsChange}
                  />
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loading ? "Publishing..." : "Publish"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label
          for="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            name="search"
            autoComplete="off"
          />

          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {!load ? (
        <div className="m-6 flex flex-wrap gap-2">
          {tags.map((t, index) => (
            <button
              key={index}
              onClick={() => click(t.id)}
              type="button"
              className={url.indexOf(t.id) !== -1 ? f : s}
            >
              {t.name}
            </button>
          ))}
        </div>
      ) : (
        <b className="w-full flex- justify-center items-center dark:text-white m-4 pt-4">
          {" "}
          Getting Tags.....
        </b>
      )}
    </button>
  );
};
