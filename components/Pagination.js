const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = (current, total) => {
    const delta = 1;
    const range = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      range.unshift("…");
    }
    if (current + delta < total - 1) {
      range.push("…");
    }

    range.unshift(1);
    if (total > 1) range.push(total);

    return range;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex flex-wrap justify-center w-full mt-10 gap-2">
      {visiblePages.map((page, idx) => (
        <button
          key={idx}
          disabled={page === "…"}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`py-2 rounded text-sm min-w-[40px] text-center ${
            page === currentPage
              ? "bg-accentGreen text-black font-bold"
              : page === "…"
              ? "cursor-default text-gray-400"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
