
import { Link, useLocation } from 'react-router-dom'




const SideBar = () => {
    const location = useLocation();





    const isItemActive = (path) => {
        return location.pathname === path;
    };


    return (
        <>
            <aside id="sidebar" className="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-white divide-y space-y-1">
                            <ul className="space-y-2 pb-2">
                                <li>
                                    <form action="#" method="GET" className="lg:hidden">
                                        <label className="sr-only">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                                </svg>
                                            </div>
                                            <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                                        </div>
                                    </form>
                                </li>
                                <li>
                                    <Link
                                        to="/doctor/"
                                        className={`text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group ${isItemActive('/doctor/') ? 'bg-gray-100' : ''
                                            }`}
                                    >
                                        <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                        </svg>
                                        <span className="ml-3">Dashboard</span>
                                    </Link>
                                </li>


                                <li>
                                    <Link
                                        to="/"
                                        className={`text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group ${isItemActive('/doctor/appointments') ? 'bg-gray-100' : ''
                                            }`}
                                    >
                                        <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm1-1h14v4H3V2zm0 6v10h14V8H3zm3 3a1 1 0 010 2h8a1 1 0 010-2H6zm0 4a1 1 0 010 2h4a1 1 0 010-2H6z" />
                                        </svg>
                                        <span className="ml-3 flex-1 whitespace-nowrap">Movies</span>
                                    </Link>
                                </li>



                                <li>
                                    <button
                                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                                    >
                                        <svg
                                            className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2zm-1 7H8" />
                                            <path d="M12 2L12 12" />
                                        </svg>
                                        <span className="ml-3 flex-1 whitespace-nowrap">Logout</span>
                                    </button>

                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideBar