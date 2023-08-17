/* eslint-disable react/prop-types */
const Sort = ({ sort, setSort }) => {
    const onSelectChange = ({ currentTarget: input }) => {
        setSort({ sort: input.value, order: sort.order });
    };

    const onArrowChange = () => {
        if (sort.order === "asc") {
            setSort({ sort: sort.sort, order: "desc" });
        } else {
            setSort({ sort: sort.sort, order: "asc" });
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <p className="text-sm font-medium">Sort By :</p>
            <select
                onChange={onSelectChange}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                defaultValue={sort.sort}
            >
                <option value="year">Year</option>
                <option value="rating">Rating</option>
            </select>
            <button
                className="flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 transition px-2 py-1"
                onClick={onArrowChange}
            >
                {sort.order === "asc" ? (
                    <>
                        <span className="mr-1">&uarr;</span>
                        <span className="hidden md:inline">Ascending</span>
                    </>
                ) : (
                    <>
                        <span className="mr-1">&darr;</span>
                        <span className="hidden md:inline">Descending</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default Sort;