import React from 'react'

export const RelatedLoading = () => {
  return (
    <div className="mt-5 max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-t-blue-500 dark:shadow-slate-700/[.7]       min-w-full">
      <div className="p-4 md:p-5 animate-pulse">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex flex-wrap justify-center text-center items-center gap-2">
          {/* Placeholder for question name */}
          <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          {/* Placeholder for clear button */}
          {/* {clearButton && (
              <span className="bg-gray-100 w-16 h-6 cursor-pointer text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"></span>
            )} */}
        </h3>
        <div className="flex gap-3 justify-center items-center p-2">
          <div className="flex flex-row gap-2 items-center text-center justify-center dark:text-white">
            {/* Placeholder for upvote button */}
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
            {/* Placeholder for vote count */}
            <div className="w-6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            {/* Placeholder for downvote button */}
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center px-6">
            <div className="flex-shrink-0">
              {/* Placeholder for user image */}
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="flex-1 gap-2 min-w-0 ms-4">
              {/* Placeholder for user name */}
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              {/* Placeholder for username and verification */}
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              {/* Placeholder for time ago */}
              <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <div className="grid gap-4 grid-cols-2 w-60 my-2.5">
                {/* Placeholder for images or video */}
                <div className="group relative">
                  <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
