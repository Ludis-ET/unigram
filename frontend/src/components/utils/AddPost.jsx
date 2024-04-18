import React, { useContext, useState } from "react";
import { ImageUpload } from "./ImageUploader";
import { Select } from "../../components";
import { useAddpost } from "../../hooks/useAddpost";
import { AuthContext, MessageContext } from "../../context";

export const AddPost = () => {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [authTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const token = authTokens ? authTokens.access : null;
  const { myprofile } = useContext(AuthContext);
  const { addMessage } = useContext(MessageContext); // State to manage selected options

  const handleSelectedOptionsChange = (options) => {
    setSelectedOptions(options);
  };

  const handleSelectedImagesChange = (images) => {
    setSelectedImages(images); // Update selected images state
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const selectedOptionIds = selectedOptions.map((option) => option.id);
    const videoFile = e.target.video.files[0];
    const video = videoFile ? videoFile : null;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("owner", myprofile.id);
    formData.append("description", description);
    formData.append("options", JSON.stringify(selectedOptionIds));
    if (video) {
      formData.append("video", video);
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}api/posts/`, {
        method: "POST",
        headers: {
          Authorization: `Alpha ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      addMessage({ type: "success", text: "Question published" });
      setShowModal(!showModal);
      // Handle image upload
      if (selectedImages.length > 0) {
        const postResponseData = await response.json();
        const postId = postResponseData.id;

        for (const image of selectedImages) {
          const imagesFormData = new FormData();
          imagesFormData.append("images", image);
          imagesFormData.append("post", postId);

          const imagesResponse = await fetch(
            `${backendUrl}api/posts/${postId}/images/`,
            {
              method: "POST",
              headers: {
                Authorization: `Alpha ${token}`,
              },
              body: imagesFormData,
            }
          );

          if (!imagesResponse.ok) {
            throw new Error("Failed to upload images");
          }
        }
      }
    } catch (error) {
      addMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleModal}
          data-modal-target="authentication-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Ask Question
        </button>

        {/* Main modal */}
        {showModal && (
          <div
            id="authentication-modal"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            aria-hidden="true"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    So, What is the problem?
                  </h3>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit} // Attach handleSubmit to form submission
                    action="#"
                  >
                    <div>
                      <label className="dark:text-white">
                        Wanna add pictures? (optional)
                      </label>
                      <div className="w-full">
                        <ImageUpload
                          x={3}
                          setSelectedImages={handleSelectedImagesChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        What is it called?
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="off"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="I had a slight issue while wrestling with..."
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        You can send a short video (optional)
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        name="video"
                      />
                    </div>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600"></div>
                      </div>
                      <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                        <textarea
                          id="editor"
                          rows="8"
                          className="block w-full outline-none px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                          placeholder="Explain your question briefly..."
                          name="description"
                          // value={description}
                          // onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      {/* Pass selectedOptions state and handleSelectedOptionsChange function to MultiSelect component */}
                      <Select
                        selectedOptions={selectedOptions}
                        onChange={handleSelectedOptionsChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {loading ? "Publishing..." : "Publish Question"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
