/* eslint-disable react/prop-types */

const Filter = ({filterGenre, setFilterGenre }) => {
    const genresData = [
        "Action",
        "Romance",
        "Fantacy",
        "Drama",
        "Crime",
        "Adventure",
        "Thriller",
        "Sci-fi",
        "Music",
        "Family"
    ];

    const onChange = ({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...filterGenre, input.value];
            setFilterGenre(state);
        } else {
            const state = filterGenre.filter((val) => val !== input.value);
            setFilterGenre(state);
        }
    };

    return (
        <div className="space-y-2 pt-6">
            <details
                className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
                <summary
                    className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
                >
                    <span className="text-sm font-medium"> Filter by Genre </span>

                    <span className="transition group-open:-rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                    <ul className="space-y-1 border-t border-gray-200 p-4">
                        {genresData?.map((genre) => (
                            <li key={genre}>
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`Filter${genre}`}
                                        className="h-5 w-5 rounded border-gray-300"
                                        value={genre}
                                        onChange={onChange}
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {genre}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </details>
        </div>
    );
};

export default Filter;
