export const ProfileLoading = () => {
  return (
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
      <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
        <div className="flex flex-wrap mb-6 xl:flex-nowrap">
          <div className="mb-5 mr-5">
            <div className="relative inline-block shrink-0 rounded-2xl bg-gray-200 animate-pulse">
              <div className="w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"></div>
            </div>
          </div>
          <div className="grow">
            <div className="flex flex-wrap items-start justify-between mb-2">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <div className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1 bg-gray-200 w-24 h-6 animate-pulse"></div>
                </div>
                <div className="flex flex-wrap pr-2 mb-4 font-medium">
                  <div className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary bg-gray-200 w-28 h-6 animate-pulse"></div>
                  <div className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary bg-gray-200 w-36 h-6 animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-wrap my-auto">
                <div className="inline-block px-6 py-3 mr-3 bg-gray-200 w-24 h-12 animate-pulse"></div>
                <div className="inline-block px-6 py-3 bg-gray-200 w-24 h-12 animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-wrap items-center">
                <div className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-gray-200 w-28 h-8 animate-pulse"></div>
                <div className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-gray-200 w-32 h-8 animate-pulse"></div>
                <div className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-gray-200 w-24 h-8 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full h-px border-neutral-200" />
        <ul
          nav-tabs
          className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments"
        >
          <li className="flex mt-2 -mb-[2px]">
            <div className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent text-muted bg-gray-200 w-24 h-10 animate-pulse"></div>
          </li>
          <li className="flex mt-2 -mb-[2px]">
            <div className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent text-muted bg-gray-200 w-24 h-10 animate-pulse"></div>
          </li>
          <li className="flex mt-2 -mb-[2px]">
            <div className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent text-muted bg-gray-200 w-24 h-10 animate-pulse"></div>
          </li>
          <li className="flex mt-2 -mb-[2px]">
            <div className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent text-muted bg-gray-200 w-24 h-10 animate-pulse"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};
