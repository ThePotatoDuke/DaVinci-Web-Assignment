import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({
  totalPosts,
  postsPerPage,
  currentPage,
  onPageChange,
}: {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number; // controlled from parent
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageItems = () => {
    const items: (number | string)[] = [];
    for (let page = 1; page <= totalPages; page++) {
      const isEdge = page === 1 || page === totalPages;
      const isNearCurrent = Math.abs(page - currentPage) <= 1;

      if (isEdge || isNearCurrent) {
        items.push(page);
      } else if (items[items.length - 1] !== "dots") {
        items.push("dots");
      }
    }
    return items;
  };

  const pageItems = getPageItems();

  return (
    <div className="flex items-center justify-between sm:flex-row flex-col sm:space-x-4">
      <p className="text-sm text-gray-300 mb-2 sm:mb-0">
        Showing{" "}
        <span className="font-medium">
          {(currentPage - 1) * postsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(currentPage * postsPerPage, totalPosts)}
        </span>{" "}
        of <span className="font-medium">{totalPosts}</span> results
      </p>

      <nav aria-label="Pagination" className="inline-flex rounded-md shadow-sm">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 text-gray-400 disabled:text-gray-600 hover:bg-gray-700 rounded-l-md"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {pageItems.map((item, idx) =>
          item === "dots" ? (
            <span key={idx} className="px-3 py-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => handlePageChange(item as number)}
              className={`px-4 py-2 text-sm font-semibold ${
                item === currentPage
                  ? "bg-indigo-500 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 text-gray-400 disabled:text-gray-600 hover:bg-gray-700 rounded-r-md"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
