/* eslint-disable react/prop-types */

import Pagination from './Pagination';

export function Table({ obj, page, limit, total, setPage }) {
    console.log(obj)
    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4">
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                <span>Movie</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Title
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Year
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Genre
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                            >
                                                Rating
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {obj?.map((movie) => (
                                            <tr key={movie?.name}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={movie?.image}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-12 py-4">
                                                    <div className="text-sm text-gray-900 ">{movie?.name}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="text-sm text-gray-900 ">{movie?.year}</div>
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    {movie?.genre.join(', ')}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                    {movie?.rating}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination currentPage={page} totalPages={Math.ceil(total / limit)} onPageChange={setPage} />
            </section>
        </>
    )
}



