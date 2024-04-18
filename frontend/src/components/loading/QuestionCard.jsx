export const QuestionCard = () => {
  return (
    <a href="#">
      <div className="mt-5 max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7] min-w-full">
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-6 w-3/4 mb-3 block"></span>
          </h3>
          <div className="flex gap-3 items-center p-2">
            <div className="flex flex-col gap-2 items-center text-center justify-center dark:text-white">
              <button
                type="button"
                className="animate-pulse text-white p-0 font-medium rounded-lg px-3 me-2 focus:outline-none "
              >
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded-full block"></span>
              </button>
              <b className="animate-pulse pr-2 pd-2">
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-6 w-12 block"></span>
              </b>
              <button
                type="button"
                className="animate-pulse text-white p-0 font-medium rounded-lg px-3 me-2 mb-2 focus:outline-none"
              >
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded-full block"></span>
              </button>
            </div>
            <div>
              <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 "></span>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                className="animate-pulse hidden text-white p-0 font-medium rounded-lg px-3 me-2 mb-2 focus:outline-none"
              >
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded-full block"></span>
              </button>
              <p className="text-gray-500 dark:text-gray-400">
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-4/5 mb-2 block"></span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-4/6 mb-2 block"></span>
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-3/6 mb-2 block"></span>
              </p>
            </div>
          </div>
          <div className="flex items-center px-6 mt-4">
            <div className="flex-shrink-0">
              <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-8 rounded-full block"></span>
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-3/4 mb-1 block"></span>
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                <span className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-2/4 mb-1 block"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
