export const FileLoading = () => {
  return (
    <div className="w-[100vh] px-10 my-4 py-6 dark:bg-gray-800 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center animate-pulse">
        <span className="font-light text-gray-600"> </span>
        <a
          className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
        >
          &nbsp;
        </a>
      </div>
      <div className="mt-2">
        <div className="bg-gray-300 h-3 w-2/3 mb-2 animate-pulse"></div>
        <div className="bg-gray-300 h-3 w-5/6 animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <a className="text-blue-600 hover:underline animate-pulse" href="#">
          &nbsp;
        </a>
        <div>
          <div className="flex items-center">
            <div className="bg-gray-300 h-8 w-8 rounded-full mr-4 animate-pulse"></div>
            <div className="bg-gray-300 h-3 w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
